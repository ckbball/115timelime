import db from '@/firebase/init'

const state = {
	user: null,

}
const getters = {
	getUser: (state) => {
		return state.user
	},


}

const mutations = {
	setUser: (state, payload) => {
		state.user = payload
	},
	unsetUser: (state, payload) => {
		console.log('unset')
		state.user = null
	},

}

const actions = {
	fetchUserData: (context, payload) => {
		db.collection('users').doc(payload).get()
		.then(doc => {
			if (doc.exists) {
				context.commit('setUser', doc.data())
			} else {
				console.log('No such user')
			}
		})
		.catch(err => {
			console.log(err)
		})
	},


}

export default {
	state,
	getters,
	mutations,
	actions
}



























