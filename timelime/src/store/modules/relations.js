import * as firebase from 'firebase'
import db from '@/firebase/init'
import { store } from '..';

const state = {
    allRelations: [],
    friends: [],
    friendRequests: [],

}
const getters = {
    getAllRelations: (state) => {
        return state.allRelations
    },
    getAllFriends: (state) => {
        return state.friends
    },
    getAllFriendsRequests: (state) => {
        return state.friendRequests
    },

}
const mutations = {
    /* ----- Boilerplate functions -------*/
    setAllRelations: (state, payload) => {
        state.allRelations = payload
    },
    unsetAllRelations: (state, payload) => {
        state.allRelations = []
    },
    pushToAllRelations: (state, payload) => {
        state.allRelations.push(payload)
    },
    setFriends: (state, payload) => {
        state.friends = payload
    },
    unsetFriends: (state, payload) => {
        state.friends = []
    },
    pushToFriends: (state, payload) => {
        state.friends.push(payload)
    },
    unsetFriendRequests: (state, payload) => {
        state.friendRequests = []
    },
    pushToRequests: (state, payload) => {
        state.friendRequests.push(payload)
    },
    setFriendRequests: (state, payload) => {
        state.friendRequests = payload
    },
    /* -----End Boilerplate functions ---- */
    updateRelations: (state, payload) => {
        state.allRelations.forEach( relation => {
            if (relation.id === payload.id) relation = payload  
        })
    },
    removeFromFriends: (state, payload) => {
        for(let index = 0; index < state.friends.length; index++){
            if(state.friends[index].id === payload.id){
                state.friends.splice(index,1)
                return
            }
        }
    },
    removeFromRequests: (state, payload) => {
        for(let index = 0; index < state.friendRequests.length; index++){
            if(state.friendRequests[index].id === payload.id){
                state.friendRequests.splice(index,1)
                return
            }
        }        
    }
}
const actions = {
    updateRequests: ({commit, getters}, {change, my_uid}) => {
        let contains = false
        getters.getAllFriendsRequests.forEach(request => {
            if(request.id === change.id){
                contains = true
                if(changeTypeIsFriendship(request, change)){
                    if(isRequest(change, my_uid)) commit('pushToRequests', change)
                    if(!isRequest(change, my_uid)) commit ('removeFromRequests',change)
                } else {
                    request = change
                }
            } 
        })
        if (contains === false ) {
            if(isRequest(change, my_uid)) commit('pushToRequests', change)
        }

    },

    updateFriends: ({commit, getters}, payload) => {
        let contains = false
        getters.getAllFriends.forEach(friend => {
            if(friend.id === payload.id){
                contains = true
                if(changeTypeIsFriendship(friend, payload)){
                    if(isFriend(payload)) commit('pushToFriends', payload)
                    if (!isFriend(payload)) commit('removeFromFriends', payload)
                } else {
                    friend = payload
                }
            }
        })
        if (contains == false) {
            if(isFriend(payload)) commit('pushToFriends', payload)
        }
    },

    sortRelation: ({commit}, {change, my_uid}) => {
        if(isRequest(change, my_uid)) commit('pushToRequests', change)
        if(isFriend(change)) commit('pushToFriends', change)
    },
    handleChanges: ({dispatch}, {change, my_uid}) => {
        dispatch('updateFriends', change)
        dispatch('updateRequests', {change: change, my_uid: my_uid})
    },
    fetchAllRelations: ({commit, dispatch}, payload) => {
        db.collection('relations').where(fbUID(payload), '>=', 'a' )
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToAllRelations', change.doc)
                dispatch('sortRelation', {change: change.doc, my_uid: payload}) 
              }
              if (change.type === 'modified') {
                commit('updateRelations', change.doc)
                dispatch('handleChanges', {change: change.doc, my_uid: payload})
              }
            })
          })
    },
    issueFriendRequest: (context, {requester, requestee}) => {
        db.collection('relations').add({
            [fbUID(requester.uid)]: 'true',
            [fbName(requester.uid)]: requester.firstName + ' ' + requester.lastName,
            [fbImage(requester.uid)]: requester.image,

            [fbUID(requestee.uid)]: 'false',
            [fbName(requestee.uid)]: requestee.firstName + ' ' + requestee.lastName,
            [fbImage(requestee.uid)]: requestee.image,
        })
        .then(docRef => {
            db.collection('relations').doc(docRef.id).update({self_id: docRef.id})
        })
    },
    // response - string "true" or "false"
    // request - the doc.data() being responded to
    // responder - the entire data for the person, to grab their uid
    respondToFriendRequest: (context, {response, request, responder}) => { 
        thisUserUID = fbUID(responder.uid)
        if(response == "true"){
            db.collection('relations').doc(request.self_id).update({[thisUserUID]: response})
        } else {
            db.collection('relations').doc(request.self_id).delete()
        }
    },

    // grabRequester returns an object with the requesters info, returns an object with:
    // name
    // image
    // uid
    // of the requester 
    grabRequester: (context, {my_uid, request}) => {
        let retObj = {}
        for(var property in request ) {
            // check if property belongs to different user
            if(belongToOtherUser(property, my_uid)) {
                retObj[getPrefix(property)] = request[property]
            }
        }
        return retObj
    },

    // respondToRequest here response is an object with the uid of the responder and their
    // response ("true" or "false"), 
    respondToRequest: (context, {request, response}) => {
        if (response.accept === "true"){
            db.collection("relations").doc(request.self_id).update({[fbUID(response.uid)]: "true"})
        } else {
            db.collection("relations").doc(request.self_id).delete()
        }
    },
}
var fbImage = (arg) => 'image_'+arg
var fbName = (arg) => 'name_'+arg
var getUID = (arg) => arg.substring(4)
var fbUID = (arg) => 'uid_'+arg
var isUID = (arg) => {
    let answer = false
    if (arg.substring(0,4)== 'uid_') {
        answer = true
    }
    return answer
}

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

var isOtherUID = (arg, payload) => {
    if (arg == fbUID(payload)){
        return false
    }
    return true
}
var isFriend = (relation) => {
    // assume they are friends
    let answer = true
    for(var property in relation.data() ) {
        if(isUID(property)) {
            if(relation.data()[property] !== 'true'){// check if they aren't
                answer = false
            }
        }
    }
    return answer
}
var isRequest = (relation, my_uid) => {
    // assume it is a request
    //let answer = true
    for(var property in relation.data() ) {
        // check if user
        if (isUID(property)){
            // check if different user
            if(isOtherUID(property, my_uid)) {
                // now see if that other user is true AND that we are false 
                if(relation.data()[property] === 'true' && relation.data()[fbUID(my_uid)] === 'false'){
                    return true
                }
            }
        }
    }
    return false
}
var changeTypeIsFriendship = (original, change) => {
    let answer = false
    for(var property in original.data()) {
        if(isUID(property)){
            if(original.data()[property] !== change.data()[property]){
                answer = true
            } 
        }
    }
    return answer
}





export default {
	state,
	getters,
	actions,
	mutations,
}