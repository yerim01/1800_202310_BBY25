
  const userCollection = firebase.firestore().collection('users');



  function handleClick() {
    const userId = firebase.auth().currentUser.uid;
    const timestamp = new Date();
    userCollection.doc(userId).update({
      timestamp: timestamp
    })
      .then(() => {
        console.log('Timestamp added to user collection');
        document.getElementById('timestamp').innerHTML = timestamp.toString();
      })
      .catch(error => console.error(error));
  }

