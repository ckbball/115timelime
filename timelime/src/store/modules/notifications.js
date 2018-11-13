import * as firebase from 'firebase'
import db from '@/firebase/init'
import router from '@/router/index'

const state = {
    notifications: []

}
const getters = {
    getAllNotifications: (state) => {
        return state.notifications
    }

}
const mutations = {
    pushToNotifications: (state, payload) => {
        state.notifications.push(payload)
    }


}
const actions = {
    fetchAllNotifications: ({commit, getters}, payload) => {
        db.collection('notifications').where('recipient', '==', payload)
        .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToNotifications', change)
            }
              if (change.type === 'modified') {

              }
            })
          })


    }


}

export default {
	state,
	getters,
	actions,
	mutations,
}