import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import colorScheme from './modules/colorScheme'
import messages from './modules/messages'
import search from './modules/search'
import posts from './modules/posts'
import relations from './modules/relations'
import notifications from './modules/notifications'

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
		posts: posts,
		messages: messages,
		relations: relations,
		notifications: notifications,
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

