// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { store } from './store/index.js'


import firebase from 'firebase'

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css';

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import VueApollo from 'vue-apollo'



const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://api.graph.cool/simple/v1/cjn578p2i1ctr0195zwtbg1st',
})
// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
// Create a new Middleware Link using setContext
const middlewareLink = setContext(() => ({
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzkyOTk2MDcsImNsaWVudElkIjoiY2puNTc4cDJpMWN0czAxOTVtMHlxMGFndiJ9.ADl1Q0hhCDIrF2GFBctAo_BFULJBqIm9QoRCLxBz_9U'
  }
}))
const link = middlewareLink.concat(httpLink);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(SuiVue)
Vue.use(VueApollo)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        store: store,
    	apolloProvider,
        router,
        components: { App },
        template: '<App/>'
    })
})