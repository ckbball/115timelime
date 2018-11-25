import * as firebase from 'firebase'
import db from '@/firebase/init'
import { store } from '..';


const state = {   
    // NOTE: these are arrays of friends, not of messages
    friendsMessaged: [],            // list of friends ever messaged
    unreadMessageCount: 0,

    // NOTE: these are arrays of messages
    // @Caesar & @Kenji & @Donovan this is a guess of what will be needed to be done
    // if you want to change or add to these please do
    allMessages: [],                // all messages in firebase
    messagesBetweenTwoUsers: [],    // list of messages between two people
    myMessages: [],                 // list of all messages belonging to a user

}
const getters = {
    getFriendsMessaged: (state) => {
        return state.friendsMessaged
    },
    getUnreadMessageCount: (state) => {
        return state.unreadMessageCount
    }
}
const mutations = {
    /* ----- Boilerplate functions -------*/
    setFriendsMessaged: (state, payload) => {
        state.friendsMessaged = payload
    },
    unsetFriendsMessaged: (state) => {
        state.friendsMessaged = []
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
     fetchMyMessageStatuses: ({commit, dispatch}, {my_uid, allMyFriends}) => {
        commit('unsetUnreadMessageCount')
        commit('unsetFriendsMessaged')

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

    fetchMessages: ({commit, dispatch}, payload) => {
        // TODO: this is old code, change it to suit messags

  //       db.collection('relations').where(fbUID(payload), '>=', 'a' )
		// .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
  //           snapshot.docChanges().forEach(change => {
  //             if (change.type === 'added') {
  //               commit('pushToAllRelations', change.doc)
  //               dispatch('sortRelation', {change: change.doc, my_uid: payload}) 
  //           }
  //             if (change.type === 'modified') {
  //               commit('updateRelations', change.doc)
  //               dispatch('handleChanges', {change: change.doc, my_uid: payload})
  //             }
  //           })
  //         })
    },


    issueMessage: (context, {messager, messagee, messageContent}) => {



        var moment = require('moment');
        db.collection('messages').add({
            //relation_id: 
            conversation_id: messagee.conversation_id,
            // time_sent: moment(Date.now()).format("dddd h:mm A, MMMM Do YYYY"),
            time_sent: Date.now(),
            message_content: messageContent,
            sender_uid: messager.uid,
            sender_name: messager.firstName + ' ' +messager.lastName,
            sender_image: messager.image,
            receiver_uid: messagee.uid,
            receiver_name: messagee.name,
            receiver_image: messagee.image,
            read: "false"
        })
        .then(docRef => {
            db.collection('messages').doc(docRef.id).update({self_id: docRef.id})
        })  


        // grab the relation and change the readUID

       db.collection('relations').doc(messagee.relation).update(
        {
            unread_message: messagee.uid,
            message_history: Date.now(),
        })
       

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