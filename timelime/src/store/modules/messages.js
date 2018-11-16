import * as firebase from 'firebase'
import db from '@/firebase/init'
import { store } from '..';


const state = {   
    // NOTE: these are arrays of friends, not of messages
    friendsMessaged: [],            // list of friends ever messaged
    friendsNotMessaged: [],         // list of friends never messaged
    friendsWithUnreadMessages: [],  // list of friends who have messages that have not been read

    // NOTE: these are arrays of messages
    // @Ceasar & @Kenji & @Donovan this is a guess of what will be needed to be done
    // if you want to change or add to these please do
    allMessages: [],                // all messages in firebase
    messagesBetweenTwoUsers: [],    // list of messages between two people
    myMessages: [],                 // list of all messages belonging to a user

}
const getters = {
    getFriendsMessaged: (state) => {
        return state.friendsMessaged
    },
    getFriendsNotMessaged: (state) => {
        return state.friendsNotMessaged
    },
    getFriendsWithUnreadMessages: (state) => {
        return state.friendsWithUnreadMessages
    },
}
const mutations = {
    /* ----- Boilerplate functions -------*/
    setFriendsMessaged: (state, payload) => {
        state.friendsMessaged = payload
    },
    unsetFriendsMessaged: (state, payload) => {
        state.friendsMessaged = []
    },
    pushToFriendsMessaged: (state, payload) => {
        state.friendsMessaged.push(payload)

        // nested function that specifies sorting of friends list, we cannot use
        // standard js sort since it is a list of objects not a list of numbers 
        // nor numbers.
        // this sort function is based off of the name field in the objects
        function compare(a,b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }
            
        state.friendsMessaged = (state.friendsMessaged).sort(compare);

    },
    setFriendsNotMessaged: (state, payload) => {
        state.friendsNotMessaged = payload
    },
    unsetFriendsNotMessaged: (state, payload) => {
        state.friendsNotMessaged = []
    },
    pushToFriendsNotMessaged: (state, payload) => {
        state.friendsNotMessaged.push(payload)

        // nested function that specifies sorting of friends list, we cannot use
        // standard js sort since it is a list of objects not a list of numbers 
        // nor numbers.
        // this sort function is based off of the name field in the objects
        function compare(a,b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }
            
        state.friendsNotMessaged = (state.friendsNotMessaged).sort(compare);
    },
    setFriendsWithUnreadMessages: (state, payload) => {
        state.friendsWithUnreadMessages = payload
    },
    unsetfriendsWithUnreadMessages: (state, payload) => {
        state.friendsWithUnreadMessages = []
    },
    pushToFriendsWithUnreadMessages: (state, payload) => {
        state.friendsWithUnreadMessages.push(payload)

        // nested function that specifies sorting of friends list, we cannot use
        // standard js sort since it is a list of objects not a list of numbers 
        // nor numbers.
        // this sort function is based off of the name field in the objects
        function compare(a,b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }
            
        state.friendsWithUnreadMessages = (state.friendsWithUnreadMessages).sort(compare);
    },
}
const actions = {
    updateMessages: ({commit, getters}, {change, my_uid}) => {
        // TODO: this is old code, change it to suit messags


        // let contains = false
        // getters.getAllFriendsRequests.forEach(request => {
        //     if(request.id === change.id){
        //         contains = true
        //         if(changeTypeIsFriendship(request, change)){
        //             if(isRequest(change, my_uid)) commit('pushToRequests', change)
        //             if(!isRequest(change, my_uid)) commit ('removeFromRequests',change)
        //         } else {
        //             request = change
        //         }
        //     } 
        // })
        // if (contains === false ) {
        //     if(isRequest(change, my_uid)) commit('pushToRequests', change)
        // }

    },
    
    // TODO: Mia 
    // sort Friends, splits friends into three categories:
    //      - friends with unread messages 
    //      - friends with only read messages 
    //      - no message history
    sortFriends: ({commit}, {change, my_uid}) => {
        // TODO: this is old code, change it to suit messags

        // if(isRequest(change, my_uid)) {
        //     commit('pushToRequests', change)
        // }
        // if(isFriend(change)){
        //     commit('pushToFriends', change)

        //     var friend = {}
        //     for(var property in change.data() ) {
        //         if(belongToOtherUser(property, my_uid)) {
        //             if(getPrefix(property) == 'uid'){
        //                 friend[getPrefix(property)] = getUID(property)
        //             } else {
        //                 friend[getPrefix(property)] = change.data()[property]
        //             }
        //         }
        //     }
        //     commit('pushToMyFriends', friend)

        // }
    },

    handleChanges: ({dispatch}, {change, my_uid}) => {
        // TODO: this is old code, change it to suit messags

        // dispatch('updateFriends', change)
        // dispatch('updateRequests', {change: change, my_uid: my_uid})
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


    issueMessage: (context, {messeger, messagee, messageID, messageContent}) => {
        // names for us1 and us2
        var uid1 = messager.uid
        var name1 = messager.firstName + ' ' +messager.lastName
        var image1 = messager.image
        var uid2 = messagee.uid
        var name2 = messagee.firstName + ' ' +messagee.lastName
        var image2 = mesagee.image
        db.collection('messages').add({
            message_id: messageID,
            time_sent: moment(Date.now()).format("dddd h:mm A, MMMM Do YYYY"),
            message_content: messageContent,
            sender_uid: uid1,
            sender_name: name1,
            sender_image: image1,
            receiver_uid: uid2,
            receiver_name: name2,
            receiver_image: image2,
            read: "false"
        })
        .then(docRef => {
            db.collection('messages').doc(docRef.id).update({self_id: docRef.id})
        })    
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


// var fbImage = (arg) => 'image_'+arg
// var fbName = (arg) => 'name_'+arg
// var getUID = (arg) => arg.substring(4)
// var fbUID = (arg) => 'uid_'+arg
// var isUID = (arg) => {
//     let answer = false
//     if (arg.substring(0,4)== 'uid_') {
//         answer = true
//     }
//     return answer
// }

// var belongToOtherUser = (arg, my_uid) => {
//     // return false because belongs to neither user
//     if (getPrefix(arg) == "self"){
//         return false
//     }
//     var n = arg.indexOf('_')
//     var someUid = arg.substring(n+1)
//     // get whatever trails after _ and see if it is the other users
//     if (someUid == my_uid){
//         return false
//     }
//     return true 
// }

// var getPrefix = (arg) => {
//     var n = arg.indexOf('_')
//     return arg.substring(0,n)
// }

// var isOtherUID = (arg, payload) => {
//     if (arg == fbUID(payload)){
//         return false
//     }
//     return true
// }
// var isFriend = (relation) => {
//     // assume they are friends
//     let answer = true
//     for(var property in relation.data() ) {
//         if(isUID(property)) {
//             if(relation.data()[property] !== 'true'){// check if they aren't
//                 answer = false
//             }
//         }
//     }
//     return answer
// }
// var isRequest = (relation, my_uid) => {
//     // assume it is a request
//     //let answer = true
//     for(var property in relation.data() ) {
//         // check if user
//         if (isUID(property)){
//             // check if different user
//             if(isOtherUID(property, my_uid)) {
//                 // now see if that other user is true AND that we are false 
//                 if(relation.data()[property] === 'true' && relation.data()[fbUID(my_uid)] === 'false'){
//                     return true
//                 }
//             }
//         }
//     }
//     return false
// }
// var changeTypeIsFriendship = (original, change) => {
//     let answer = false
//     for(var property in original.data()) {
//         if(isUID(property)){
//             if(original.data()[property] !== change.data()[property]){
//                 answer = true
//             } 
//         }
//     }
//     return answer
// }





export default {
	state,
	getters,
	actions,
	mutations,
}