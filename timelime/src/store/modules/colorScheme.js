

const state = {
	primaryColor: 'teal',
	secondaryColor: 'blue',
	tertiaryColor: 'violet',

}
const getters = {
	getPrimaryColor: (state) => {
		return state.primaryColor
	},
	getSecondaryColor: (state) => {
		return state.secondaryColor
	},
	getTertiaryColor: (state) => {
		return state.tertiaryColor
	},

}
const mutations = {
	setPrimaryColor: (state, payload) => {
		state.PrimaryColor = payload
	},
	setPrimaryColor: (state, payload) => {
		state.SecondaryColor = payload
	},
	setPrimaryColor: (state, payload) => {
		state.TertiaryColor = payload
	}

}
const actions = {	
	
}

export default {
	state,
	getters,
	actions,
	mutations,
}