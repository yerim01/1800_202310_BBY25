

// for temperature slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var confirmButton = document.getElementById("confirmButton");


// output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
}

confirmButton.addEventListener("click", function () {
  var value = slider.value;
  var confirmValue = confirm("Are you sure you want to select " + value + "?");

  if (confirmValue) {
    if (value > 54) {
      openPopup2();
      // window.open("popup1.html", "Popup", "width=400,height=400", "openPopup()");
    }

    else {
      // slider.value = 23; // Reset the slider to the default value if the user cancels
      // output.innerHTML = slider.value;
      window.location.href = "heatindex.html";
    }
  }
});

//for share popup
let popup1 = document.getElementById("popup1");

function openPopup1() {
  popup1.classList.add("open-popup1");
}

function closePopup1() {
  popup1.classList.remove("open-popup1");
}


// for warning pop
let popup2 = document.getElementById("popup2");



function openPopup2() {
  popup2.classList.add("open-popup2");

  // Add a button to the popup that redirects the user
  var popupButton = document.createElement("button");
  popupButton.innerText = "OK";
  popupButton.addEventListener("click", function () {
    // Redirect the user to a different page
    window.location.href = "heatindex.html";
  });
  popup2.appendChild(popupButton);
}

// function openPopup2() {
//   popup2.classList.add("open-popup2");
// }

// function closePopup2() {
//   popup2.classList.remove("open-popup2");
// }

// Get a reference to the button element
var myButton = document.getElementById("othersfeelbtn");

// Add an event listener to the button that redirects the user to a new page
myButton.addEventListener("click", function () {
  window.location.href = "../heatindex.html";
});












// // Authenticate the user
// firebase.auth().signInAnonymously().catch(function(error) {
//     console.error("Error authenticating user: ", error);
// });





// Get the button element and add an event listener to it
const getLocationBtn = document.getElementById('getLocationBtn');
getLocationBtn.addEventListener('click', getLocation);





function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Add the location data to the Firestore collection
      addLocationToFirestore(latitude, longitude);
  }, function(error) {
      console.error("Error getting location: ", error);
  });
}

function addLocationToFirestore(latitude, longitude) {
  const timestamp = firebase.firestore.Timestamp.now();
  db.collection("locations").add({
      latitude: latitude,
      longitude: longitude,
      timestamp: timestamp
  })
  .then(function(docRef) {
      console.log("Location added to Firestore with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding location to Firestore: ", error);
  });
}
