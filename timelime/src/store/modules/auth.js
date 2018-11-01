import * as firebase from 'firebase'
import db from '@/firebase/init'

const state = {
	authenticatedUser: null,

}
const getters = {
	getAuthenticatedUser: (state, getters) => {
		return state.authenticatedUser
	},
	isLoggedIn: (state) => {
		if (state.authenticatedUser !== null && state.authenticatedUser !== undefined ) 
			return true
		else 
			return false
	}

}
const mutations = {
	setAuthenticatedUser: (state, payload) => {
		state.authenticatedUser = payload
	},
	unsetAuthenticatedUser: (state) => {
		state.authenticatedUser = null
	}

}
const actions = {
	authenticateUser: ({commit}, {email, password}) => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(cred => {
				commit('setAuthenticatedUser', cred.user)
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
				commit('setAuthenticatedUser', cred.user)
				resolve(cred)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
		})

	},
	signUserOut: ({commit}) => {
		firebase.auth().signOut()
		.then(()=> {
			commit('unsetAuthenticatedUser')
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