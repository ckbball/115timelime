import db from '@/firebase/init'

const state = {
	user: {
		Name: "Mia Potato",
		Bio: "hey fuckface",
		Photo: "https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	},

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



























