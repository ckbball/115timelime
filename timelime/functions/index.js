const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccount.json')

/* ---------Import Schedule for jobs ---------- */
const schedule = require('node-schedule');


/* -------- Express stuff ------------ */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({
  origin: '*',
    // origin: '*',
	// allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
	// methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	// optionsSuccessStatus: 200
});



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
db.settings({ timestampsInSnapshots: true })

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


/* ------ Writing the scheduling code -----*/
var rule = new schedule.RecurrenceRule();
rule.seconds = 5

var j = schedule.scheduleJob(rule, function(){
	console.log('deleting docs...')
    var endTime = Date.now()
    db.collection('posts').where('expire_time', '<', endTime).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            	console.log('deleting',doc)
              db.collection('posts').doc(doc.id).delete().then(function() {
                
              })
              .catch(err => {
                  console.log("failed with error: " + err)
              })
            })
        })
        .catch(err => {
          console.log("failed with error: " + err)
        })
        
})
	


/* ---------------------------------------*/




/* ----- Write new Firebase functions down here ---- */
exports.changeProfilePhotoAcrossData = functions.firestore
.document('users/{uid}').onUpdate((change, context) => {
	//return a promise :(
	const newValue = change.after.data()
	const oldValue = change.before.data()
	const allPromises = []


	var uid = newValue.uid
	var URL = newValue.image

	// change in posts 
	const p1 = db.collection('posts').where('author_uid', '==', uid).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('posts').doc(doc.id).update({
					author_image: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p1)

	// change in comments 
	const p2 = db.collection('comments').where('author_uid', '==', uid).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('comments').doc(doc.id).update({
					author_image: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p2)

	// change in messages
	const p3 = db.collection('messages').where('receiver_uid', '==', uid).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('messages').doc(doc.id).update({
					receiver_image: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p3)
	  
	// change in messages
	const p4 = db.collection('messages').where('sender_uid', '==', uid).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('messages').doc(doc.id).update({
					sender_image: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p4)

	// change in relations 
	const p5 = db.collection('relations').where('uid_'+uid, '>=', 'a').get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('relations').doc(doc.id).update({
					['image_'+uid]: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p5)

	// change in likes 
	const p6 = db.collection('likes').where('author_uid', '==', uid).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				const p = db.collection('likes').doc(doc.id).update({
					author_uid: URL
				})

				promises.push(p)
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p6)

	return Promise.all(allPromises)
})

exports.editWhoSeesOnRelationChange = functions.firestore
.document('relations/{relationID}').onUpdate((change, context) => {
	var isFriend = (relation) => {
		// assume they are friends
		let answer = true
		for(var property in relation ) {
			if(isUID(property)) {
				if(relation[property] !== 'true'){// check if they aren't
					answer = false
				}
			}
		}
		return answer
	}

	var isUID = (arg) => {
		let answer = false
		if (arg.substring(0,4)== 'uid_') {
			answer = true
		}
		return answer
	}
	var getUID = (arg) => arg.substring(4)
	var extractUIDs = (arg) => {
		let answer = []
		for (var property in arg) { 
			if(isUID(property)) answer.push(getUID(property))
		}
		return answer
	}


	const newValue = change.after.data()
	const uids = extractUIDs(newValue)
	const allPromises = []

	const p1 = db.collection('posts').where('author_uid', '==', uids[0]).get()
	.then(snapshot => {
		if(snapshot.size > 0) {
			const promises = []
			snapshot.docs.forEach(doc => {
				if(isFriend(newValue)){
				const p = db.collection('posts').doc(doc.id)
				.update({"whoSees": admin.firestore.FieldValue.arrayUnion(uids[1])})
				promises.push(p)

				} else {
				const p = db.collection('posts').doc(doc.id)
				.update({"whoSees": admin.firestore.FieldValue.arrayRemove(uids[1])})

				promises.push(p)

				}
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p1)
	const p2 = db.collection('posts').where('author_uid', '==', uids[1]).get()
	.then(snapshot => {
		if(snapshot.size > 0){
			const promises = []

			snapshot.docs.forEach(doc => {
				if(isFriend(newValue)){
					const p = db.collection('posts').doc(doc.id)
					.update({"whoSees": admin.firestore.FieldValue.arrayUnion(uids[0])})
					
					promises.push(p)
				} else {
					const p = db.collection('posts').doc(doc.id)
					.update({"whoSees": admin.firestore.FieldValue.arrayRemove(uids[0])})
					
					promises.push(p)
				}
			})
			return Promise.all(promises)
		}
	})
	allPromises.push(p2)
	return Promise.all(allPromises)
})

exports.updateSearchableName = functions.firestore
.document('users/{uid}').onUpdate((change, context) => {
	let promise = new Promise((resolve, reject)=> {
		const newValue = change.after.data()
		const oldValue = change.before.data()

		if(newValue.firstName !== oldValue.firstName || newValue.lastName !== oldValue.lastName){
			db.collection('users').doc(change.before.id).update({searchableName: newValue.firstName.toLowerCase() + ' ' + 
			newValue.lastName.toLowerCase()})
			.then(() => {
				resolve()
			})
			.catch(err=> {
				reject()
			})
		}
		resolve()
	})
	return promise
});

exports.issueNotificationOnNewComment = functions.firestore
.document('comments/{commentId}').onCreate((snapshot, context) => {
	let promise = new Promise((resolve, reject) => {
		const newValue = snapshot.data()
		var post_author_uid = db.collection('posts').doc(newValue.parent_id).author_uid
		if (post_author_uid !== newValue.author_uid){
			db.collection('notifications').add({
				parent_id: newValue.parent_id, 
				recipient: newValue.postAuthor_uid,
				notif_id: newValue.author_uid,
				notif_image: newValue.author_image,
				content: newValue.author_name+ ' commented on one of your posts.',
				read: false, 
			})
			.then(docRef => {
				resolve()
			})
			.catch(err => {
				reject()
			})
		}
	})	
	return promise
})

exports.issueNotificationOnNewLike = functions.firestore
.document('likes/{likeId}').onCreate((snapshot, context) => {
	let promise = new Promise((resolve, reject) => {
		const newValue = snapshot.data()
		var post_author_uid = db.collection('posts').doc(newValue.parent_id).author_uid
		if (post_author_uid !== newValue.author_uid){
			db.collection('notifications').add({
				parent_id: newValue.parent_id, 
				recipient: newValue.postAuthor_uid,
				notif_id: newValue.author_uid,
				notif_image: newValue.author_image,
				content: newValue.author_name+ ' liked one of your posts.',
				read: false, 
			})
			.then(docRef => {
				resolve()
			})
			.catch(err => {
				reject()
			})
		}
	})	
	return promise
})

exports.updateCommentCountOnAPost = functions.firestore
.document('comments/{commentId}').onCreate((snapshot, context) => {
	let promise = new Promise ((resolve, reject) => {
		const comment = snapshot.data()
		db.collection('posts').doc(comment.parent_id)
		.update({'commentIDs': admin.firestore.FieldValue.arrayUnion(snapshot.id)})
		.then(() => {
			resolve()
		})
		.catch(err => {
			reject()
		})
	})
	return promise
})

exports.addNewComment = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		let parent_id = req.body.parent_id
		let postAuthor_uid = req.body.postAuthor_uid
		let author_uid = req.body.author_uid
		let author_image = req.body.author_image
		let author_name = req.body.author_name
		let content = req.body.content
		let time_sent = req.body.time_sent

		let promise = new Promise ((resolve, reject) => {
			db.collection('comments').add({
				parent_id: parent_id,
				postAuthor_uid: postAuthor_uid,
				author_uid: author_uid,
				author_image: author_image,
				author_name: author_name,
				content: content,
				time_sent: time_sent
			})
			.then(docRef => {
				console.log(docRef.id)
				//db.collection('comments').doc(docRef.id).update({comment_id: docRef.id})
				resolve(res.send('comment added'))
			})
			.catch(err => {
				console.log(err)
				reject(res.status(500).send(err))
			})
		})
		return promise
	})
})

 exports.addLike = functions.https.onRequest((req, res) => {
 	cors(req, res, () => {
 		let parent_id = req.body.parent_id
 		let author_uid = req.body.author_uid
 		let author_image = req.body.author_image
 		let author_name = req.body.author_name
        let postAuthor_uid = req.body.postAuthor_uid

 		let promise = new Promise ((resolve, reject) => {
 			db.collection('likes').add({
 				parent_id: parent_id,
 				author_uid: author_uid,
 				author_image: author_image,
 				author_name: author_name,
				postAuthor_uid: postAuthor_uid
 			})
			.then(docRef => {
				console.log(docRef.id)
 				db.collection('likes').doc(docRef.id).update({likeid: docRef.id})
 				resolve(res.send('post liked!'))
 			})
 			.catch(err => {
 				console.log(err)
 				reject(res.status(500).send(err))
 			})
 		})
 	})
 })

// exports.removeLike = functions.https.onRequest((req, res) => {
// 	cors(req, res, () => {
// 		let author_uid = req.body.author_uid
// 		let parent_id = req.body.parent_id

// 		let promise = new Promise ((resolve, reject) => {
// 			db.collection('likes').where('parent_id', '==', parent_id).where('author_uid', '==', author_uid).get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                   db.collection('likes').doc(doc.id).delete().then(function() {
// 					resolve(res.send('like removed'))
//                   })
//                   .catch(err => {
//                     reject(res.status(500).send(err))
//                   })
//                 })
//             })
//             .catch(err => {
//               console.log("failed with error: " + err)
//             })
			
// 		})
// 	})
// })


exports.addNewPost = functions.https.onRequest((req, res) => {
	console.log('adding a new post!')
	cors(req, res, () => {
		let parent_id = req.body.parent_id
		let author_uid = req.body.author_uid
		let author_image = req.body.author_image
		let author_name = req.body.author_name
		let content = req.body.content
		let whoSees = req.body.whoSees
		let photo_URL = req.body.photo_URL
        let is_photo_post = req.body.is_photo_post
		let upload_time = req.body.upload_time
		let duration = req.body.duration
        let expire_time = upload_time + duration

		let promise = new Promise ((resolve, reject) => {
			db.collection('posts').add({
				parent_id: parent_id,
				author_uid: author_uid,
				author_image: author_image,
				author_name: author_name,
				content: content,
				photo_URL: photo_URL,
				is_photo_post: is_photo_post,
				whoLikes: [],
				whoSees: whoSees,
				commentIDs: [],
				upload_time: upload_time,
				duration: duration,
                expire_time: expire_time,
			})
			.then(docRef => {
				console.log(docRef.id)
				db.collection('posts').doc(docRef.id).update({post_id: docRef.id})
				resolve(res.send('post added'))
			})
			.catch(err => {
				console.log(err)
				reject(res.status(500).send(err))
			})
		})
		return promise
	})
})
exports.addUserToFirestoreAfterAccountCreation = functions.auth.user().onCreate((user) => {
	let promise = new Promise((resolve, reject) =>{	
		const email = user.email
		const uid = user.uid
		db.collection('users').doc(uid).set({
			email: email,
			uid: uid,
			firstName: '',
			lastName: '',
			image: 'https://www.familyhandyman.com/wp-content/uploads/2017/09/dfh17sep001_shutterstock_550013404.jpg',
			bio:'',
		})
		.then(() => {
			console.log('User Successfully Added')
			resolve()
		})
		.catch(() => {
			console.log(err)
			reject()
		})
	})
	return promise
})

exports.searchUsers = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		let search = req.query.name
		search = search.toLowerCase()
		console.log(1, search)
		let type = req.query.type
		let users = []
		let promise = new Promise((resolve, reject) => {
			db.collection('users')
			.where('searchableName', '>=', search)
			.where('searchableName', '<', search + '\uf8ff')
			.get()
			.then((snapshot) => {
			snapshot.docs.forEach(doc => {
				console.log(doc.data().firstName ,doc.data().uid)
				let user = {
					firstName: doc.data().firstName || '',
					lastName: doc.data().lastName || '',
					image: doc.data().image || '',
					uid: doc.data().uid 
				}
				users.push(user)
			})
			resolve(res.send(users))
			})
			.catch(err => {
				console.log(err)
				reject(res.status(500).send(err))
			})
		})
		return promise
	})
});


exports.addFakeUSer = functions.https.onRequest((req, res) =>{

let users=[{"name":{"title":"mr","first":"samuel","last":"gaillard"},"email":"samuel.gaillard@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/20.jpg","medium":"https://randomuser.me/api/portraits/med/men/20.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/20.jpg"}},{"name":{"title":"miss","first":"آیلین","last":"علیزاده"},"email":"آیلین.علیزاده@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/38.jpg","medium":"https://randomuser.me/api/portraits/med/women/38.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/38.jpg"}},{"name":{"title":"mr","first":"arnaud","last":"barnaby"},"email":"arnaud.barnaby@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/78.jpg","medium":"https://randomuser.me/api/portraits/med/men/78.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/78.jpg"}},{"name":{"title":"mr","first":"owen","last":"young"},"email":"owen.young@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/80.jpg","medium":"https://randomuser.me/api/portraits/med/men/80.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/80.jpg"}},{"name":{"title":"mrs","first":"marissol","last":"martins"},"email":"marissol.martins@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/77.jpg","medium":"https://randomuser.me/api/portraits/med/women/77.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/77.jpg"}},{"name":{"title":"mr","first":"etienne","last":"barnaby"},"email":"etienne.barnaby@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/80.jpg","medium":"https://randomuser.me/api/portraits/med/men/80.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/80.jpg"}},{"name":{"title":"mr","first":"edward","last":"turner"},"email":"edward.turner@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/46.jpg","medium":"https://randomuser.me/api/portraits/med/men/46.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/46.jpg"}},{"name":{"title":"mr","first":"david","last":"newman"},"email":"david.newman@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/14.jpg","medium":"https://randomuser.me/api/portraits/med/men/14.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/14.jpg"}},{"name":{"title":"mrs","first":"maja","last":"andersen"},"email":"maja.andersen@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/31.jpg","medium":"https://randomuser.me/api/portraits/med/women/31.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/31.jpg"}},{"name":{"title":"mrs","first":"sura","last":"van den bersselaar"},"email":"sura.vandenbersselaar@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/87.jpg","medium":"https://randomuser.me/api/portraits/med/women/87.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/87.jpg"}},{"name":{"title":"mr","first":"tom","last":"brady"},"email":"tom.brady@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/12.jpg","medium":"https://randomuser.me/api/portraits/med/men/12.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/12.jpg"}},{"name":{"title":"ms","first":"amelia","last":"cole"},"email":"amelia.cole@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/9.jpg","medium":"https://randomuser.me/api/portraits/med/women/9.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/9.jpg"}},{"name":{"title":"miss","first":"holly","last":"hale"},"email":"holly.hale@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/61.jpg","medium":"https://randomuser.me/api/portraits/med/women/61.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/61.jpg"}},{"name":{"title":"ms","first":"زهرا","last":"قاسمی"},"email":"زهرا.قاسمی@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/28.jpg","medium":"https://randomuser.me/api/portraits/med/women/28.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/28.jpg"}},{"name":{"title":"miss","first":"rosa","last":"poulsen"},"email":"rosa.poulsen@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/91.jpg","medium":"https://randomuser.me/api/portraits/med/women/91.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/91.jpg"}},{"name":{"title":"mr","first":"maxime","last":"morin"},"email":"maxime.morin@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/32.jpg","medium":"https://randomuser.me/api/portraits/med/men/32.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/32.jpg"}},{"name":{"title":"miss","first":"kimberly","last":"wells"},"email":"kimberly.wells@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/7.jpg","medium":"https://randomuser.me/api/portraits/med/women/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/7.jpg"}},{"name":{"title":"mr","first":"landon","last":"smith"},"email":"landon.smith@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/87.jpg","medium":"https://randomuser.me/api/portraits/med/men/87.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/87.jpg"}},{"name":{"title":"mrs","first":"özsu","last":"gürmen"},"email":"özsu.gürmen@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/87.jpg","medium":"https://randomuser.me/api/portraits/med/women/87.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/87.jpg"}},{"name":{"title":"miss","first":"hilda","last":"hopkins"},"email":"hilda.hopkins@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/86.jpg","medium":"https://randomuser.me/api/portraits/med/women/86.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/86.jpg"}},{"name":{"title":"mr","first":"valdemar","last":"sørensen"},"email":"valdemar.sørensen@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/85.jpg","medium":"https://randomuser.me/api/portraits/med/men/85.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/85.jpg"}},{"name":{"title":"mr","first":"evan","last":"wood"},"email":"evan.wood@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/23.jpg","medium":"https://randomuser.me/api/portraits/med/men/23.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/23.jpg"}},{"name":{"title":"ms","first":"hilla","last":"annala"},"email":"hilla.annala@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/7.jpg","medium":"https://randomuser.me/api/portraits/med/women/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/7.jpg"}},{"name":{"title":"miss","first":"quinty","last":"osman"},"email":"quinty.osman@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/7.jpg","medium":"https://randomuser.me/api/portraits/med/women/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/7.jpg"}},{"name":{"title":"mr","first":"سورنا","last":"قاسمی"},"email":"سورنا.قاسمی@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/85.jpg","medium":"https://randomuser.me/api/portraits/med/men/85.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/85.jpg"}},{"name":{"title":"madame","first":"sylvie","last":"renard"},"email":"sylvie.renard@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/6.jpg","medium":"https://randomuser.me/api/portraits/med/women/6.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/6.jpg"}},{"name":{"title":"madame","first":"gertrude","last":"renard"},"email":"gertrude.renard@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/69.jpg","medium":"https://randomuser.me/api/portraits/med/women/69.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/69.jpg"}},{"name":{"title":"ms","first":"sarah","last":"bell"},"email":"sarah.bell@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/60.jpg","medium":"https://randomuser.me/api/portraits/med/women/60.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/60.jpg"}},{"name":{"title":"mrs","first":"ylse","last":"coenders"},"email":"ylse.coenders@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/25.jpg","medium":"https://randomuser.me/api/portraits/med/women/25.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/25.jpg"}},{"name":{"title":"mrs","first":"wendelien","last":"floris"},"email":"wendelien.floris@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/22.jpg","medium":"https://randomuser.me/api/portraits/med/women/22.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/22.jpg"}},{"name":{"title":"miss","first":"lauren","last":"anderson"},"email":"lauren.anderson@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/45.jpg","medium":"https://randomuser.me/api/portraits/med/women/45.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/45.jpg"}},{"name":{"title":"mr","first":"anthony","last":"webb"},"email":"anthony.webb@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/76.jpg","medium":"https://randomuser.me/api/portraits/med/men/76.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/76.jpg"}},{"name":{"title":"mr","first":"niklas","last":"kivi"},"email":"niklas.kivi@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/15.jpg","medium":"https://randomuser.me/api/portraits/med/men/15.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/15.jpg"}},{"name":{"title":"mr","first":"leevi","last":"saari"},"email":"leevi.saari@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/63.jpg","medium":"https://randomuser.me/api/portraits/med/men/63.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/63.jpg"}},{"name":{"title":"mr","first":"winfried","last":"marx"},"email":"winfried.marx@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/10.jpg","medium":"https://randomuser.me/api/portraits/med/men/10.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/10.jpg"}},{"name":{"title":"ms","first":"ester","last":"fiksdal"},"email":"ester.fiksdal@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/92.jpg","medium":"https://randomuser.me/api/portraits/med/women/92.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/92.jpg"}},{"name":{"title":"mr","first":"maxwell","last":"webb"},"email":"maxwell.webb@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/41.jpg","medium":"https://randomuser.me/api/portraits/med/men/41.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/41.jpg"}},{"name":{"title":"mr","first":"zoran","last":"leibold"},"email":"zoran.leibold@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/45.jpg","medium":"https://randomuser.me/api/portraits/med/men/45.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/45.jpg"}},{"name":{"title":"ms","first":"holly","last":"ortiz"},"email":"holly.ortiz@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/41.jpg","medium":"https://randomuser.me/api/portraits/med/women/41.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/41.jpg"}},{"name":{"title":"mr","first":"ahmet","last":"tanrıkulu"},"email":"ahmet.tanrıkulu@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/69.jpg","medium":"https://randomuser.me/api/portraits/med/men/69.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/69.jpg"}},{"name":{"title":"miss","first":"aada","last":"pesola"},"email":"aada.pesola@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/6.jpg","medium":"https://randomuser.me/api/portraits/med/women/6.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/6.jpg"}},{"name":{"title":"mrs","first":"lisanna","last":"erdem"},"email":"lisanna.erdem@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/48.jpg","medium":"https://randomuser.me/api/portraits/med/women/48.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/48.jpg"}},{"name":{"title":"ms","first":"alexis","last":"gonzales"},"email":"alexis.gonzales@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/24.jpg","medium":"https://randomuser.me/api/portraits/med/women/24.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/24.jpg"}},{"name":{"title":"miss","first":"elizabeth","last":"medina"},"email":"elizabeth.medina@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/31.jpg","medium":"https://randomuser.me/api/portraits/med/women/31.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/31.jpg"}},{"name":{"title":"mr","first":"dominic","last":"margaret"},"email":"dominic.margaret@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/82.jpg","medium":"https://randomuser.me/api/portraits/med/men/82.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/82.jpg"}},{"name":{"title":"mr","first":"clemêncio","last":"peixoto"},"email":"clemêncio.peixoto@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/12.jpg","medium":"https://randomuser.me/api/portraits/med/men/12.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/12.jpg"}},{"name":{"title":"mrs","first":"emilie","last":"mortensen"},"email":"emilie.mortensen@example.com","picture":{"large":"https://randomuser.me/api/portraits/women/31.jpg","medium":"https://randomuser.me/api/portraits/med/women/31.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/31.jpg"}},{"name":{"title":"mr","first":"sander","last":"christensen"},"email":"sander.christensen@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/68.jpg","medium":"https://randomuser.me/api/portraits/med/men/68.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/68.jpg"}},{"name":{"title":"mr","first":"jimme","last":"hordijk"},"email":"jimme.hordijk@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/1.jpg","medium":"https://randomuser.me/api/portraits/med/men/1.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/1.jpg"}},{"name":{"title":"mr","first":"isidor","last":"rosenberg"},"email":"isidor.rosenberg@example.com","picture":{"large":"https://randomuser.me/api/portraits/men/7.jpg","medium":"https://randomuser.me/api/portraits/med/men/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/7.jpg"}}]

users.forEach(user => {
	let searchable = user.name.first + ' ' + user.name.last
	db.collection('users').add({
		firstName: user.name.first,
		lastName: user.name.last,
		searchableName: searchable,
		image: user.picture.medium
	})
	.then(docRef => {
		db.collection('users').doc(docRef.id).update({uid: docRef.id})
	})
	

})
res.send('done')
}) 

exports.santizeUsers = functions.https.onRequest((req, res) =>{
	db.collection('users').get()
	.then((snapshot) => {
		snapshot.docs.forEach(doc => {
			if(!doc.data().uid)(
				db.collection('users').doc(doc.id).delete()
				
			)
		})
	})
	.catch(err => {
		console.log(err)
	})
	res.send('done')
})
















