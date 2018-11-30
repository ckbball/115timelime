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
					store.dispatch('fetchAllRelations', store.getters.getAuthenticatedUser.uid)
					store.dispatch('fetchAllNotifications', store.getters.getAuthenticatedUser.uid)
					store.dispatch('fetchTimelime', store.getters.getAuthenticatedUser.uid)

					// store.dispatch('fetchMyPosts', store.getters.getAuthenticatedUser.uid)
				}
				return 
			case 'finishFetchingRelations':
				if(store.getters.getAuthenticatedUser){
					// store.dispatch('fetchAllMyFriendsPosts', store.getters.getAllFriends)
					store.dispatch('fetchMyMessageStatuses', store.getters.getAllFriends)
				}
		}
	})

	store.subscribeAction(({type, payload}, state) => {
		switch(type) {
			 case 'signUserOut': 
			 	store.commit('unsetAuthenticatedUser')
				store.commit('unsetUserInfo')	
				store.commit('unsetAllRelations')
				store.commit('unsetFriends')
				store.commit('unsetFriendsMessaged')
				store.commit('unsetFriendsNotMessaged')
				store.commit('unsetfriendsWithUnreadMessages')
				store.commit('unsetTimelime')
			 	return router.replace('Login')
	
		}
	})
}