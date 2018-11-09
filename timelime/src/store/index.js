import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import colorScheme from './modules/colorScheme'
import search from './modules/search'
import relations from './modules/relations'

import configureModerator  from './modules/store-moderator'

import * as firebase from 'firebase'
import db from '@/firebase/init'


Vue.use(Vuex)


export const store = new Vuex.Store({
	plugins: [configureModerator],
	modules: {
		auth: auth,
		user: user,
		search: search,
		relations: relations,
		colorScheme: colorScheme,
		configureModerator

	},
	state: {

	},
	getters: {


	},
	mutations: {



	},
	actions: {

	},







})

