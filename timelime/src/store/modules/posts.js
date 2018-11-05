import * as firebase from 'firebase'
import db from '@/firebase/init'

const state = {
	post: null,

}
const getters = {

}
const mutations = {
	
}
const actions = {	
	getPost: ({commit}, {email, password}) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(cred => {
			commit('setAuthenticatedUser', cred.user)
		})
		.catch(err => {
			console.log(err)
		})
	},


}

export default {
	state,
	getters,
	actions,
	mutations,
}