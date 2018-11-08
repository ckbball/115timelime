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
        return state.friendsRequests
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



}
const actions = {
    updateFriends: ({commit, getters}, payload) => {
        let index = 0
        if(isFriend(payload)) commit('pushToFriends', payload)
        if (!isFriend(payload)) commit('removeFromFriends', payload)
        
        
    },

    sortRelation: ({commit}, payload) => {
        if(isFriend(payload)) commit('pushToFriends', payload)
    },
    handleChanges: ({dispatch}, payload) => {
        dispatch('updateFriends', payload)
    },
    fetchAllRelations: ({commit, dispatch}, payload) => {
        //let uid = fbUID
        db.collection('relations').where(fbUID(payload), '>=', 'a' )
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToAllRelations', change.doc)
                // lets sort the relations
                dispatch('sortRelation', change.doc)
              }
              if (change.type === 'modified') {
                commit('updateRelations', change.doc)
                dispatch('handleChanges', change.doc)
              }
            })
          })
    

    }

}

var getUID = (arg) => arg.substring(4)
var fbUID = (arg) => 'uid_'+arg
var isUID = (arg) => {
    let answer = false
    if (arg.substring(0,4)== 'uid_') {
        answer = true
    }
    return answer
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





export default {
	state,
	getters,
	actions,
	mutations,
}