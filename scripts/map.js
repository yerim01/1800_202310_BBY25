function showMap() {
  // Defines basic mapbox data
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
  const map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
    center: [-122.964274, 49.236082], // Starting position
    zoom: 8 // Starting zoom
  });

  // Add user controls to map
  map.addControl(new mapboxgl.NavigationControl());

  // Adds map features
  map.on('load', () => {
    // Defines map pin icon for events
    map.loadImage(
      'https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png',
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage('eventpin', image); // Pin Icon

        // READING information from "events" collection in Firestore
        db.collection('locations').get().then(allEvents => {
          const features = []; // Defines an empty array for information to be added to

          allEvents.forEach(doc => {
            latitude = doc.data().latitude;
            longitude = doc.data().longitude;
            console.log(latitude, longitude);
            coordinates = [longitude, latitude];
            console.log(coordinates);
            // Coordinates
            event_name = doc.data().name; // Event Name
            preview = doc.data().details; // Text Preview
            // img = doc.data().posterurl; // Image
            // url = doc.data().link; // URL


            // Pushes information into the features array
            features.push({
              'type': 'Feature',
              'properties': {
                'description': `<strong>${event_name}</strong><p>${preview}</p> <br> <a href="/main.html?id=${doc.id}" target="_blank" title="Opens in a new window">Read more</a>`
              },
              'geometry': {
                'type': 'Point',
                'coordinates': coordinates
              }
            });
          });

          // Adds features as a source to the map
          map.addSource('places', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': features
            }
          });

          // Creates a layer above the map displaying the pins
          map.addLayer({
            'id': 'places',
            'type': 'symbol',
            // source: 'places',
            'source': 'places',
            'layout': {
              'icon-image': 'eventpin', // Pin Icon
              'icon-size': 0.1, // Pin Size
              'icon-allow-overlap': true // Allows icons to overlap
            }
          });

          // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
          map.on('click', 'places', (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
          });

          // Change the cursor to a pointer when the mouse is over the places layer.
          map.on('mouseenter', 'places', () => {
            map.getCanvas().style.cursor = 'pointer';
          });

          // Defaults cursor when not hovering over the places layer
          map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
          });
        });
      }
    );

    // Add the image to the map style.
    map.loadImage(
      'https://cdn-icons-png.flaticon.com/512/61/61168.png',
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style with width and height values
        map.addImage('userpin', image, { width: 10, height: 10 });

        // Adds user's current location as a source to the map
        navigator.geolocation.getCurrentPosition(position => {
          const userLocation = [position.coords.longitude, position.coords.latitude];
          console.log(userLocation);
          if (userLocation) {
            map.addSource('userLocation', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': [{
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': userLocation
                  },
                  'properties': {
                    'description': 'Your location'
                  }
                }]
              }
            });

            // Creates a layer above the map displaying the user's location
            map.addLayer({
              'id': 'userLocation',
              'type': 'symbol',
              'source': 'userLocation',
              'layout': {
                'icon-image': 'userpin', // Pin Icon
                'icon-size': 0.05, // Pin Size
                'icon-allow-overlap': true // Allows icons to overlap
              }
            });

            // Map On Click function that creates a popup displaying the user's location
            map.on('click', 'userLocation', (e) => {
              // Copy coordinates array.
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
              

            });

            // Change the cursor to a pointer when the mouse is over the userLocation layer.
            map.on('mouseenter', 'userLocation', () => {
              map.getCanvas().style.cursor = 'pointer';
            });

            // Defaults
            // Defaults cursor when not hovering over the userLocation layer
            map.on('mouseleave', 'userLocation', () => {
              map.getCanvas().style.cursor = '';
            });
          }
        });
      }
    );
  });
}

// Call the function to display the map with the user's location and event pins
showMap();
console.log("nextstep");

// // for card
// function populatetemps() {
//   let userCardTemplate = document.getElementById("tempCardTemplate");
//   let userCardGroup = document.getElementById("tempCardGroup");

//   let params = new URL('map.html',window.location.href) //get the url from the searbar
//   let userID = params.searchParams.get("docID")
//   console.log(userID);
//   db.collection("users").where("name", "==", userID).get()
//     .then(alltemps => {
//       temps = alltemps.docs;
//       console.log(temps);
//       temps.forEach(doc => {
//         var user = doc.data().name; //gets the name field
//         var email = doc.data().email; //gets the unique ID field
//         // var season = doc.data().season;
//         // var description = doc.data().description; //gets the length field
//         // var flooded = doc.data().flooded;
//         // var scrambled = doc.data().scrambled;
//         var time = doc.data().timestamp.toDate();
//         console.log(time)

//         let tempCard = userCardTemplate.content.cloneNode(true);
//         tempCard.querySelector('.name').innerHTML = title;     //equiv getElementByClassName
//         tempCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
//         tempCard.querySelector('.email').innerHTML = `email: ${level}`;
//         // tempCard.querySelector('.season').innerHTML = `season: ${season}`;
//         // tempCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
//         // tempCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
//         // tempCard.querySelector('.description').innerHTML = `Description: ${description}`;
//         userCardGroup.appendChild(tempCard);
//       })
//     })
// }
// populatetemps();

