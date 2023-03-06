//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    //keys go here 
    apiKey: "AIzaSyBLPuPEMw5VV-DvYSIQZjyc7X5SKzK3bBY",
    authDomain: "heatpro-62070.firebaseapp.com",
    projectId: "heatpro-62070",
    storageBucket: "heatpro-62070.appspot.com",
    messagingSenderId: "483967183474",
    appId: "1:483967183474:web:0adf32d917571d857b30eb",
    measurementId: "G-2E6H9F7XEV"
  
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
