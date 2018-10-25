const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccount.json')


/* -------- Express stuff ------------ */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
/* ----------------------------------- */


/* ------- These can be removed----------- */
const axios = require('axios')
const { server } = require('./graphQLServer')
/* --------------------------------------- */


/* Firesbase init */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://timelime-96d47.firebaseio.com'
});

const db = admin.firestore()

/* ------------- */


const app = express()
app.use(bodyParser.json())


/* I think this can be removed */
server.applyMiddleware({ 
	app, 
	gui: {
		endpoint: '/graphql'
	}
}); 
/* -------------------------- */


/* --------- Express Server -----------*/
//  https://us-central1-timelime-96d47.cloudfunctions.net/main/api/...
const main = express()
main.use('/api', app )
exports.main = functions.https.onRequest(main);
/*--------------------------------------*/



/* ----- Write new Firebase functions down here ---- */
exports.testfunc= functions.https.onRequest((request, response) => {
	response.send('hey this worked')
})
exports.addUserToFirestoreAfterAccountCreation = functions.auth.user().onCreate((user) => {
	const email = user.email
	const uid = user.uid
	db.collection('users').doc(uid).set({
		email: email,
		uid: uid
	})
	.then(() => {
		console.log('User Successfully Added')
	})
	.catch(() => {
		console.log(err)
	})
})

exports.searchUsers = functions.https.onRequest((req, res) => {
	let users = []
	let promise = new Promise((resolve, reject) => {
		db.collection('users')
		//.where('searchableName', '>=', req)
		//.where('searchableName', '<', req + '\uf8ff')
		.get()
		.then((snapshot) => {
		snapshot.docs.forEach(doc => {
			let user = {
				firstName: doc.data().firstName || null,
				lastName: doc.data().lastName || null, 
			}
			users.push(user)
		})
		//resolve(res.send(users))
			resolve(res.send(req.body.key))
		})
		.catch(err => {
			console.log(err)
			reject(res.status(500).send(err))
		})
	})


});



