import * as firebase from 'firebase'
import db from '@/firebase/init'
import { store } from '..';
import { get } from 'https';


const state = {   
    // NOTE: these are arrays of friends, not of messages
    friendsMessaged: [],            // list of friends ever messaged
    unreadMessageCount: 0,

    // NOTE: these are arrays of messages
    // @Caesar & @Kenji & @Donovan this is a guess of what will be needed to be done
    // if you want to change or add to these please do
    allMessages: [],                // all messages in firebase
    messagesBetweenTwoUsers: [],    // list of messages between two people
    myMessages: [],        // list of all messages belonging to a user
    friendsMessages: [],



    conversationList: []

}
const getters = {
    getConversationList: (state) => {
        return state.conversationList
    },
    getFriendsMessaged: (state) => {
        return state.friendsMessaged
    },
    getUnreadMessageCount: (state) => {
        return state.unreadMessageCount
    },
    // testing function in MessageContainer
    getOurMessages: (state) => {
        // console.log('in getOurMessages' + state.messagesBetweenTwoUsers)
        return state.messagesBetweenTwoUsers
    },
}
const mutations = {
    pushToConversationList: (state, payload) => {
        console.log('payloadd', payload.data())
        if(state.conversationList.length === 0) {
            state.conversationList.push(payload)
            return
          }
          if(state.conversationList[0].data().lastEntry_time > payload.data().lastEntry_time) {
              state.conversationList.unshift(payload)
              return
          }
          if(state.conversationList[state.conversationList.length-1].data().lastEntry_time
             < payload.data().lastEntry_time) {
              state.conversationList.push(payload)
              return
          }
          for(let i = 0; i < state.conversationList.length;  i++){
            if(state.conversationList[i].data().lastEntry_time > payload.data().lastEntry_time){
              state.conversationList.splice(i, 0, payload)
              return
            }
          }    
    },
    unsetConversationList: (state, payload) => {
        state.conversationList = []
    },
    /* ----- Boilerplate functions -------*/
    setFriendsMessaged: (state, payload) => {
        state.friendsMessaged = payload
    },
    unsetFriendsMessaged: (state) => {
        state.friendsMessaged = []
    },
    // sets our messages
    setOurMessages: (state, payload) => {
        state.messagesBetweenTwoUsers = payload
        console.log(state.messagesBetweenTwoUsers)
    },
    unsetOurMessages: (state) => {
        state.messagesBetweenTwoUsers = []
    },
    pushToOurMessages: (state, payload) => {
        var friendInfo = {}

        for(var property in payload.data() ) {
            friendInfo[property] = payload.data()[property]
        }

        friendInfo['self_id'] = payload.id
        state.messagesBetweenTwoUsers.push(friendInfo)
        
    },
    pushToFriendsMessaged: (state, payload) => {
        if (!(containsObject(payload, state.friendsMessaged))){
            state.friendsMessaged.push(payload)
        }

        // nested function that specifies sorting of friends list, we cannot use
        // standard js sort since it is a list of objects not a list of numbers 
        // nor numbers.
        // this sort function is based off of the name field in the objects
        function compare(a,b) {
            if (a.message != b.message){
                if (a.message > b.message)
                    return -1;
                if (a.message < b.message)
                    return 1;
                return 0;
            } else {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            }
        }
            
        state.friendsMessaged = (state.friendsMessaged).sort(compare);

    },
    unsetUnreadMessageCount: (state, payload) => {
        state.unreadMessageCount = 0
    },
    addToUnreadMessageCount: (state) => {
        state.unreadMessageCount += 1
    },


}
const actions = {
    fetchConversationList: ({commit}, payload) => {
        db.collection('conversations').where('parent_id', '==', payload)
        .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    commit('pushToConversationList', change.doc)
                }
                if (change.type === 'modified') {
                    // modified can mean require reordering of list,
                    // if a new message comes from a different person
                }
            })
          })
    },




     fetchMyMessageStatuses: ({commit, dispatch}, {my_uid, allMyFriends}) => {
        commit('unsetUnreadMessageCount')
        commit('unsetFriendsMessaged')
        // console.log(allMyFriends[allMyFriends.length - 1].self_id + ' in fetchMyMessageStatuses')

        allMyFriends.forEach( friend =>{

            var friendFormatted = {}
            for(var property in friend ) {
                if(belongToOtherUser(property, my_uid)) {
                    if(getPrefix(property) == 'uid'){
                        friendFormatted[getPrefix(property)] = getUID(property)
                    } else {
                        friendFormatted[getPrefix(property)] = friend[property]
                    }
                }
                if (property == "conversation_id"){
                    friendFormatted[property]=friend[property]
                }
            }

            if (friendFormatted.unread === my_uid) {
                commit('addToUnreadMessageCount')
            }


            commit('pushToFriendsMessaged', friendFormatted)
        })
    },

    readMessage({commit, dispatch}, {my_uid, friend}){

        db.collection('relations').doc(friend.relation).update(
        {
            unread_message: "",
        })
    },
    
    fetchMessages: ({commit, dispatch}, {messager, messagee}) => {
        

        state.messagesBetweenTwoUsers = []

        var conv_id = ""
         if(messager.uid > messagee.uid){
            conv_id = messager.uid + "_" + messagee.uid
        } else {
            conv_id = messagee.uid + "_" + messager.uid
        }

        // Call to get messages I sent to friend
        db.collection('messages')
        .where('conversation_id', '==', conv_id)
        .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
          snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                  commit('pushToOurMessages', change.doc)
              }
          })
        })
        
        
    
    },

    sortMessages: ({commit, dispatch}, {my_uid, allMyFriends}) => {
        console.log('in sortMessages')
        console.log(allMyFriends)
        
        function compare(a,b) {
            if (a.time_sent < b.time_sent){
                return -1
            } else {
                return 1
            }
        }
        
        // sorts messages in descending order based on time_sent (newest messages are last)
        var sortedMessages = (allMyFriends).sort(compare);

        state.messagesBetweenTwoUsers = sortedMessages
        // console.log('is it sorted? ' + sortedMessages[0].message_content)
        
    },


    issueMessage: (context, {messager, conversation, messageContent}) => {
        //var conv_id = ""
        // if(messager.uid > messagee.uid){
        //     conv_id = messager.uid + "_" + conversation.friend_uid
        // } else {
        //     conv_id = conversation.uid + "_" + messager.uid
        // }
        var moment = require('moment');
        db.collection('messages').add({ 

            conversation_id: conversation.conversation_id,
            // time_sent: moment(Date.now()).format("dddd h:mm A, MMMM Do YYYY"),
            time_sent: Date.now(),
            message_content: messageContent,
            sender_uid: messager.uid,
            sender_name: messager.firstName + ' ' +messager.lastName,
            sender_image: messager.image,
            receiver_uid: conversation.friend_uid,
            receiver_name: conversation.friend_name,
            receiver_image: conversation.friend_image,
            read: "false"
        })
        .then(docRef => {
            db.collection('messages').doc(docRef.id).update({self_id: docRef.id})
        }) 
        db.collection('conversations').where('conversation_id','==', conversation.conversation_id).get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                db.collection('conversations').doc(doc.id).update({
                    lastEntry_time: Date.now(),
                    lastEntry_content: messageContent
                })
            })
        }) 


        // grab the relation and change the readUID

    //    db.collection('relations').doc(messagee.relation).update(
    //     {
    //         unread_message: messagee.uid,
    //         message_history: Date.now(),
    //     })
       

        // TODO: Mia change the friend doc to have messaged and change who needs to read it
    },

    // grabMessager returns an object with the messagers info, returns an object with:
    // name
    // image
    // uid
    // of the requester 
    grabMessager: (context, {my_uid, request}) => {
        // TODO: this is old code, change it to suit messags

        // let retObj = {}
        // for(var property in request ) {
        //     // check if property belongs to different user
        //     if(belongToOtherUser(property, my_uid)) {
        //         retObj[getPrefix(property)] = request[property]
        //     }
        // }
        // return retObj
    },

}

// TODO: create helper functions, these are old ones, they may be helpful a lot of them are in helpers.js

var belongToOtherUser = (arg, my_uid) => {
    // return false because belongs to neither user
    if (getPrefix(arg) == "self"){
        return false
    }
    var n = arg.indexOf('_')
    var someUid = arg.substring(n+1)
    // get whatever trails after _ and see if it is the other users
    if (someUid == my_uid){
        return false
    }
    return true 
}

var getPrefix = (arg) => {
    var n = arg.indexOf('_')
    return arg.substring(0,n)
}

var getUID = (arg) => arg.substring(4)

var containsObject = (obj, list) =>  {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].uid === obj.uid) {
            return true;
        }
    }
    return false;
}



export default {
	state,
	getters,
	actions,
	mutations,
}