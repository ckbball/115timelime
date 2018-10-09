import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'

import configureModerator  from './modules/store-moderator'

import * as firebase from 'firebase'
import db from '@/firebase/init'


Vue.use(Vuex)


export const store = new Vuex.Store({
	plugins: [configureModerator],
	modules: {
		auth: auth,
		user: user,
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

