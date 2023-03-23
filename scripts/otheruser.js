function otherusersfeel() {
    let tempCardTemplate = document.getElementById("tempCardTemplate");
    let tempCardGroup = document.getElementById("tempCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let name = params.searchParams.get("docID")
    
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("users").where( "name", "==", name).get()
        .then(allUsers => {
            users=allUsers.docs;
            console.log(usersfeel);
            users.forEach(doc => {
                var name = doc.data().name; //gets the name field
                var email = doc.data().email; //gets the unique ID field
                // var season = doc.data().season;
                // var description = doc.data().description; //gets the length field
                // var flooded = doc.data().flooded;
                // var scrambled = doc.data().scrambled;
                // var time = doc.data().timestamp.toDate();
                console.log(name)

                let userCard = tempCardTemplate.content.cloneNode(true);
                userCard.querySelector('.name').innerHTML = title;     //equiv getElementByClassName
                userCard.querySelector('.email').innerHTML =  `email: ${email}`; 
                // reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                // reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                // reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                // reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                // reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                // reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                tempCardGroup.appendChild(userCard);
            })
        })
}
otherusersfeel();