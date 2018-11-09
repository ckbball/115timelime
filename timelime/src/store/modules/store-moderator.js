import Vuex from 'vuex'
import Router from 'vue-router'
import store from '@/store/index'
import router from '@/router/index'

// dispatch actions
// commit mutations

export default function configureModerator (store) {
	store.subscribe(({type, payload },  state) => {
		switch (type) {
			case 'setAuthenticatedUser':
				if(store.getters.getAuthenticatedUser){
					store.dispatch('fetchUserInfo', store.getters.getAuthenticatedUser.uid)
					//store.dispatch('fetchFriendRequests', store.getters.getAuthenticatedUser.uid)
					//store.dispatch('fetchFriends', store.getters.getAuthenticatedUser.uid)
					store.dispatch('fetchAllRelations', store.getters.getAuthenticatedUser.uid )
				}

	
				return 
		}
	})

	store.subscribeAction(({type, payload}, state) => {
		switch(type) {
			 case 'signUserOut': 
			 	store.commit('unsetAuthenticatedUser')
				store.commit('unsetUserInfo')
				//store.commit('unsetFriendRequests')	
				//store.commit('unsetFriends')	
				store.commit('unsetAllRelations')
				store.commit('unsetFriends')
			 	return router.replace('Login')
	
		}
	})
}