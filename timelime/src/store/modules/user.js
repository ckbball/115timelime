import db from '@/firebase/init'

// swaure bracket for variable []. 
// make update action
const state = {
	user: {
		Bio: 'bio'
	}
}

const getters = {}

const mutations = {
	setUser: (state, payload) => {
		state.user = payload
	},
	unsetUser: (state, payload) => {
		// console.log('unset')
		state.user = null
	},

}

const actions = {
	updateUserBio: (context, payload) => {
		context.state.user.Bio = payload
	},
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