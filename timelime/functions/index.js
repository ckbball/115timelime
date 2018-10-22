const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { server } = require('./graphQLServer')


const app = express()
app.use(bodyParser.json())

server.applyMiddleware({ 
	app, 
	gui: {
		endpoint: '/graphql'
	}
});
  


const main = express()
main.use('/api', app )

exports.main = functions.https.onRequest(main);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.testfunc= functions.https.onRequest((request, response) => {
	response.send('hey this worked')
})

exports.helloWorld = functions.https.onRequest((request, response) => {
	axios.get('http://xkcd.com/614/info.0.json')
	.then(res => {
		response.send(res.data)
	})
	.catch(()=> {
		response.send('didnt work')
	})

});
