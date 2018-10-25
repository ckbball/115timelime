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
	fetchSearchResults: (context, payload) => {
		this.axios.get('http://localhost:5001/timelime-96d47/us-central1/searchUsers/?name=dono')
		.then(response => {
			console.log('asd', response)
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