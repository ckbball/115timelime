import * as firebase from 'firebase'
import db from '@/firebase/init'
import router from '@/router/index'

const state = {
	authenticatedUser: null,
	userInfo: {},
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

}
const mutations = {
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

	fetchUserInfo: (context, payload) => {
		db.collection('users').doc(payload)
		.onSnapshot(doc => {
			context.commit('setUserInfo', doc.data())
		})

	},

	updateUserInfo: (context, {uid, update}) => {
		db.collection('users').doc(uid).update(update)
		.then(() => {
			resolve()
		})
		.catch(err => {

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
				resolve(cred.user)
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