import Router from 'vue-router'
import store from '@/store/index'
import router from '@/router/index'

// dispatch actions
// commit mutations

export default function configureModerator (store) {
	store.subscribe(({type, payload },  state,) => {
		switch (type) {
			case 'setAuthenticatedUser': 
				//store.dispatch('fetchUserData', store.getters.getAuthenticatedUser.uid)
				router.replace ('Home')
				return
			case 'registerNewUser':
				router.replace('Login')
				return
			case '':
				return
		}
	})

	store.subscribeAction(({type, payload}, state) => {
		switch(type) {
			case 'signUserOut': 
				store.commit('unsetAuthenticatedUser')
				store.commit('unsetUser')
				
				return router.replace('Login')
			

		}
	})




}