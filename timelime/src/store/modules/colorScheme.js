

const state = {
	colors: ['teal', 'blue', 'violet'],
	colorsIndex: {
		primary: 0,
		secondary: 1,
		tertiary:2
	}

}
const getters = {
	getColor: (state) => (color) => {
		console.log(state.colorsIndex[color])
		return state.colors[state.colorsIndex[color]]
	}

}
const mutations = {

	setColor: (state, {index, newColor}) => {
		state.colors[state.colorsIndex[index]] = newColor
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