const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors({ origin: true }));

app.get('/timestamp', (request, response) => {
	response.send('kahflkjhlkfhasd');
})

const main = express();
main.use('/api', app );

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
		response.send(res.data);
	})
	.catch(()=> {
		response.send('didnt work');
	})

});
