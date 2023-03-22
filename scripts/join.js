const firebaseConfig = {
  apiKey: "AIzaSyBLPuPEMw5VV-DvYSIQZjyc7X5SKzK3bBY",
  authDomain: "heatpro-62070.firebaseapp.com",
  projectId: "heatpro-62070",
  storageBucket: "heatpro-62070.appspot.com",
  messagingSenderId: "483967183474",
  appId: "1:483967183474:web:0adf32d917571d857b30eb",
  measurementId: "G-2E6H9F7XEV",
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var collectionRef = db.collection("users");

document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  const signUpemail = document.getElementById("signUpEmail").value;
  const signUppassword = document.getElementById("signUpPassword").value;
  const displayName = document.getElementById("displayName").value;

  const auth = firebase.auth();

  auth
    .createUserWithEmailAndPassword(signUpemail, signUppassword)
    .then((userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;

      collectionRef
        .add({
          name: displayName,
          email: signUpemail,
          timestamp: timestamp
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          window.location.assign("../after_login.html");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      console.log("login failed");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
