const state = {
	searchResults: []

}
const getters = {
	getResults: (state) => {
		return state.searchResults
	}
}
const mutations = {
	setResults: (state, payload) => {
		state.searchResults = payload
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