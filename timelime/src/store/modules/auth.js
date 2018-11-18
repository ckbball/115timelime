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
			let total = 0
			let count = 0
			for (let property in doc.data() ){
				total++
				
				if(doc.data()[property] === '') count++
				if(doc.data()[property] === 'https://www.familyhandyman.com/wp-content/uploads/2017/09/dfh17sep001_shutterstock_550013404.jpg')
					count++
			}
			let percent = Math.floor(count/total*100)
			console.log('percent: ', percent)
			if (100 - percent < 75){
				db.collection('notifications').add({
					content: 'Your profile is lacking, fill it out',
					parent_id: '',
					read: false,
					recipient: doc.data().uid
				})
			}
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