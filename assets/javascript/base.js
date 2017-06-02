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
    var auth = firebase.auth();
    //users logged in

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $('#nav-home').hide();
        $('#nav-login').hide();

        $("#logOut").on("click", function() {
            auth.signOut();
            document.location.reload();
        });

      } else {
        // No user is signed in.
        $('#nav-profile').hide();
        $('#nav-find').hide();
        $('#nav-logout').hide();
      }
    });
});