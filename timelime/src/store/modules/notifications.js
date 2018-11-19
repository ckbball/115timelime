import * as firebase from 'firebase'
import db from '@/firebase/init'
import router from '@/router/index'

const state = {
    notifications: [],
    numberOfUnreadNotifications: 0

}
const getters = {
    getAllNotifications: (state) => {
        return state.notifications
    },
    getNumberOfUnreadNotifications: (state) => {
        return state.numberOfUnreadNotifications
    }

}
const mutations = {
    unsetNotifications: (state) => {
        state.notifications = []
        state.numberOfUnreadNotifications = 0
    },

    pushToNotifications: (state, payload) => {
        state.notifications.push(payload)
        if(payload.data().read === false) state.numberOfUnreadNotifications++
    },
    updateNotifications: (state, payload) => {
        state.notifications.forEach(notif => {
            if (notif.id === payload.id) {
                if(notif.data().read === false && payload.data().read === true){
                    notif = payload
                    state.numberOfUnreadNotifications--
                }
            }
        })
    }


}
const actions = {
    acknowledgeNotification: (context, payload) => {
        if (payload.data().read === false) {
            db.collection('notifications').doc(payload.id).update({read: true})
        }

    }, 

    fetchAllNotifications: ({commit, getters}, payload) => {
        db.collection('notifications').where('recipient', '==', payload)
        .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                commit('pushToNotifications', change.doc)
            }
              if (change.type === 'modified') {
                commit('updateNotifications', change.doc)
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