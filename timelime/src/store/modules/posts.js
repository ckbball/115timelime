import * as firebase from 'firebase'
import db from '@/firebase/init'
import { store } from '..'
import helpers from './helpers.js'

import { mapGetters, mapActions } from 'vuex'

const computed = {
	...mapGetters([
	  'getAllFriends'
	]),
}
const state = {
	post: null,
    allMyPosts: [],
    allMyNetworksPosts: [],
    friendRequests: [],


}
const getters = {
	getAllMyNetworksPosts: (state) => {
        return state.allMyNetworksPosts
    },
    getAllMyPosts: (state) => {
    	return state.allMyPosts
    },

}
const mutations = {
	/* ----- Boilerplate functions -------*/
    setAllMyNetworksPosts: (state, payload) => {
        state.allMyNetworksPosts = payload
    },
    unsetAllMyNetworksPosts: (state, payload) => {
        state.allMyNetworksPosts = []
    },
    pushToAllMyNetworksPosts: (state, payload) => {
        state.allMyNetworksPosts.push(payload)
    },
    setAllMyPosts: (state, payload) => {
        state.allMyPosts = payload
    },
    unsetAllMyPosts: (state, payload) => {
        state.allMyPosts = []
    },
    pushToAllMyPosts: (state, payload) => {
        state.allMyPosts.push(payload)
    },    
    

}
const actions = {	
	// payload here is the uid of the CURRENT user
    fetchMyPosts: ({commit, dispatch}, payload) => {
        state.allMyPosts = []
        state.allMyNetworksPosts = []

	    db.collection('posts').where('author_uid', '==', payload)
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToAllMyPosts', change.doc)
                commit('pushToAllMyNetworksPosts', change.doc)
                // dispatch('sortRelation', {change: change.doc, my_uid: payload}) 
            }
              if (change.type === 'modified') {
                commit('pushToAllMyPosts', change.doc)
                commit('pushToAllMyNetworksPosts', change.doc)
                // dispatch('handleChanges', {change: change.doc, my_uid: payload})
              }
            })
        })
    },


    // NOTE: this is a helper function which happens to AllMyNetworkPosts
    // payload here is the uid of the user
    fetchPostsOfAUser: ({commit, dispatch}, payload) => {
	    db.collection('posts').where('author_uid', '==', payload)
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToAllMyNetworksPosts', change.doc)
            }
              if (change.type === 'modified') {
                commit('pushToAllMyNetworksPosts', change.doc)
              }
            })
        })
    },


    // payload here is the uid of the user
    // step one, grab a users friends, then call `fetchPostsOfAUser` for each user to make 
    // AllMyNetworksPosts reflect this 
    fetchAllMyFriendsPosts: ({commit, dispatch}, {my_uid, allMyFriends}) => {
      console.log("ive never had ANAL!")
    	allMyFriends.forEach( friend =>{
    		for(var property in friend.data()){
    			if(helpers.isUID(property)){
		            if(property != helpers.fbUID(my_uid)){
		            	var plainUID = helpers.getUID(property)
		            	dispatch('fetchPostsOfAUser', plainUID) 
		            } 
		    	}
    		}
    	})
    }

}




export default {
	state,
	getters,
	actions,
	mutations,
}