import * as firebase from 'firebase'
import db from '@/firebase/init'
import router from '@/router/index'

const state = {
	authenticatedUser: null,
	userInfo: {},
	friendRequests: [],
	friends: [],

}
const getters = {
	getAuthenticatedUser: (state) => {
		return state.authenticatedUser
	},
	isLoggedIn: (state) => {
		if (state.authenticatedUser !== null && state.authenticatedUser !== undefined ) 
			return true
		else 
			return false
	},
	getUserInfo: (state) => {
		return state.userInfo
	},
	getFriendRequests: (state) => {
		return state.friendRequests
	},
	getFriends: (state) => {
		return state.friends
	}


}
const mutations = {
	setFriends: (state, payload) => {
		state.friends = payload
	},
	unsetFriends: (state, payload) => {
		state.friends = []
	},
	pushToFriends: (state, payload) => {
		state.friends.push(payload)
	},
	pushToFriendRequests: (state, payload) => {
		state.friendRequests.push(payload)
	},
	setFriendRequests: (state, payload) => {
		state.friendRequests = payload
	},
	unsetFriendRequests: (state, payload ) => {
		state.friendRequests = []
	},
	setAuthenticatedUser: (state, payload) => {
		state.authenticatedUser = payload
	},
	unsetAuthenticatedUser: (state, payload) => {
		state.authenticatedUser = null
	},
	setUserInfo: (state, payload) => {
		state.userInfo = payload
	},
	unsetUserInfo: (state, payload) => {
		state.userInfo = {}
	},


}
const actions = {
	fetchFriends: (context, payload) => {
		db.collection('relations').where('uid_'+payload, '>=', 'a')
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    context.commit('pushToFriends', change.doc)
				}
				if (change.type === 'modified') {

				}
            })
        })
	},

	fetchFriendRequests: (context, payload) => {
		db.collection('relations').where('uid_'+payload, '==', 'false')
		.onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    context.commit('pushToFriendRequests', change.doc)
				}
				if (change.type === 'modified') {

				}
            })
        })
	},


	fetchUserInfo: (context, payload) => {
		db.collection('users').doc(payload)
		.onSnapshot(doc => {
			context.commit('setUserInfo', doc.data())
		})

	},

	authenticateUser: ({commit,dispatch}, {email, password}) => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(cred => {
				resolve(cred)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
		})
	},
	registerNewUser: ({commit}, {email, password}) => {
		return new Promise((resolve, reject) => {	
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(cred => {
				// commit('setAuthenticatedUser', cred.user)
				resolve(cred)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
		})

	},
	signUserOut: (context, payload) => {
		context.commit('unsetUserInfo')
		firebase.auth().signOut()
		.then(() => {

		})
		.catch(err => {
			console.log(err)
		})
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}