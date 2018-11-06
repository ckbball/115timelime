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


}

const actions = {
	updateUserBio: (context, payload) => {
		context.state.user.Bio = payload
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}