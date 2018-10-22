const admin = require('firebase-admin')
const {serviceAccount} = require('../config/firebaseServiceAccount')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://timelime-96d47.firebaseio.com'
});

const db = admin.firestore()

module.exports = {
  db
}