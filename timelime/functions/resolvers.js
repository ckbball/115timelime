const admin = require('firebase-admin');
const { db } = require('./init.js')


// const users = [
// 	{id: 'u1', name: 'donovan', user_email: 'asd@yahoo.com'},
// 	{id: 'u2', name: 'mia', user_email: 'dsa@yahoo.com'},
// 	{id: 'u3', name: 'kenji', user_email: 'ewq@yahoo.com'},
// 	{id: 'u4', name: 'caesar', user_email: 'asdasd@yahoo.com'},
// ]

// const posts = [
// 	{id: 'p1', authorid: 'u1', content: 'this is the first post' },
// 	{id: 'p2', authorid: 'u2', content: 'this is the second post' },
// 	{id: 'p3', authorid: 'u1', content: 'this is the third post' },
// ]



exports.resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world5!'
    }, // note this comma
    bye: (root, args, context) => {
      return 'bye!'
    },
    allUsers: (root, args, context) => {
      let users = []
    	return new Promise((resolve, reject) => {
    		db.collection('users').get()
    		.then((snapshot) => {
    			snapshot.docs.forEach(doc => {
            users.push(doc.data())
          })
          resolve(users)
    		})
        .catch(err => {
          reject(err)
        })
    	})
    },

    allPosts: (root, args, context) => {
      let posts = []
      return new Promise((resolve, reject) => {
        db.collection('posts').get()
        .then((snapshot) => {
          snapshot.docs.forEach(doc => {
            posts.push(doc.data())
          })
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    user: (root, args, context) => {
      return new Promise((resolve, reject) => {
        db.collection('users').doc(args.id).get()
        .then(doc => {
          if (doc.exists) 
            resolve(doc.data())
          else
            reject('userById Error')
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  }, 
  // authoredBy: (root, args, context) => {
  //     return new Promise ((resolve, reject) => {
  //       db.collection('posts').doc(args.id).get()
  //       .then(doc => {
  //         if (doc.exists)
  //           resolve(doc.data())
  //         else
  //           reject('authoredBy Error')
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //     })




  // },




  // User: {
  //   posts(user) {
  //     return new Promise ((resolve, reject ) => {
  //       let posts = []
  //       db.collection('posts').where('authoredBy', '==', 'user').get()
  //       .then((snapshot) => {
  //         snapshot.docs.forEach(doc => {
  //           posts.push(doc.data())
  //         })
  //         resolve(posts)
  //       })
  //     })

  //   }
  // }
}