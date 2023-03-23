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
var collectionRef = db.collection("locations");

document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  const signUpemail = document.getElementById("signUpEmail").value;
  const signUppassword = document.getElementById("signUpPassword").value;
  const displayName = document.getElementById("displayName").value;
  const timestamp = firebase.firestore.Timestamp.now();

  const auth = firebase.auth();

  auth
    .createUserWithEmailAndPassword(signUpemail, signUppassword)
    .then((userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;

      const userData = {
        name: displayName,
        email: signUpemail,
        latitude: null,
        longitude: null,
        timestemp: timestamp
      };

      // Call getLocation to get the user's current location
      getLocation();

      collectionRef.doc(user.uid).set(userData)
        .then(() => {
          console.log("User data written to Firestore with ID: ", user.uid);
          window.location.assign("../after_login.html");
        })
        .catch((error) => {
          console.error("Error adding user data to Firestore: ", error);
        });
    })
    .catch((error) => {
      console.log("Registration failed");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(latitude, " ",longitude);
      sendPosition(position); // call sendPosition() with latitude and longitude values
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function sendPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Update the location data for the current user in the Firestore collection
  collectionRef.doc(firebase.auth().currentUser.uid).update({
    latitude: latitude,
    longitude: longitude
  }).then(function () {
    console.log(latitude, " ", longitude);
    // The data has been updated successfully
    console.log("Location data updated in Firebase Firestore.");
  }).catch(function (error) {
    // Handle any errors that occur
    console.error("Error updating location data in Firebase Firestore: " + error.message);
  });
  window.location.assign("../after_login.html");
}

  //   auth
  //     .createUserWithEmailAndPassword(signUpemail, signUppassword)
  //     .then((userCredential) => {
  //       console.log(userCredential);
  //       // Signed in
  //       const user = userCredential.user;

  //       collectionRef
  //         .add({
  //           name: displayName,
  //           email: signUpemail,
  //         })
  //         .then((docRef) => {
  //           console.log("Document written with ID: ", docRef.id);
  //           window.location.assign("../after_login.html");
  //         })
  //         .catch((error) => {
  //           console.error("Error adding document: ", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("login failed");
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });


