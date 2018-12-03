import firebase from 'firebase'
import firestore from 'firebase/firestore'

 var config = {
   apiKey: "AIzaSyCQXTmER3-sp1FKGbMCuYaFqtjNtdcaW5c",
   authDomain: "timelime-96d47.firebaseapp.com",
   databaseURL: "https://timelime-96d47.firebaseio.com",
   projectId: "timelime-96d47",
   storageBucket: "timelime-96d47.appspot.com",
   messagingSenderId: "745633359616"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()


/*
import firebase from 'firebase' 
import firestore from 'firebase/firestore'

  var config = {
    apiKey: "AIzaSyCQXTmER3-sp1FKGbMCuYaFqtjNtdcaW5c",
    authDomain: "timelime-96d47.firebaseapp.com",
    databaseURL: "https://timelime-96d47.firebaseio.com",
    projectId: "timelime-96d47",
    storageBucket: "timelime-96d47.appspot.com",
    messagingSenderId: "745633359616"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export default firebaseApp.firestore();



console.log(storageRef)

const firebaseUtils = firebaseApp.firestore();
export default firebaseUtils;
*/