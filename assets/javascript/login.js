$(document).ready(function() {

    //initialize firebase
    var config = {
        apiKey: "AIzaSyB8dlnUx6FvgQebpp-Whw2t1aI-UyD1_X4",
        authDomain: "kungfu-78401.firebaseapp.com",
        databaseURL: "https://kungfu-78401.firebaseio.com",
        projectId: "kungfu-78401",
        storageBucket: "kungfu-78401.appspot.com",
        messagingSenderId: "727656314805"
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    var auth = firebase.auth()
    //users logged in

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('redirect user here');

        window.location.href = 'profile.html';

        // User is signed in.
      } else {
        console.log('no user');
        // No user is signed in.
      }
    });

    $("#login").on("click", function(e) {
        console.log("hello what");
        e.preventDefault();
        //get email and password values
        email = $("#emailInput").val().trim();
        password = $("#passwordInput").val().trim();
        //sign in
        var promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));

    });

    // var connectionsRef = db.ref("/connections");
    // var connectedRef = db.ref(".info/connected");
    // connectedRef.on("value", function(snap) {

    //     // If they are connected..
    //     if (snap.val()) {

    //         // Add user to the connections list.
    //         var con = connectionsRef.push(true);
    //         // Remove user from the connection list when they disconnect.
    //         con.onDisconnect().remove();
    //     }
    // });



});



