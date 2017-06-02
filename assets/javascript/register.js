$(document).ready(function() {

    var db = firebase.database();
    var auth = firebase.auth()
    //users logged in

    var email = $("#emailInput");
    var password = $("#passwordInput");
    var petInfo = [];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('redirect user here');

        // window.location.href = 'profile.html';

        // User is signed in.
      } else {
        console.log('no user');
        // No user is signed in.
      }
    });

    $("#signUp").on("click", function(e) {
        e.preventDefault();
        //get email and password values
        email = email.val().trim();
        password = password.val().trim();
        //sign in
        var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
        var loginError = promise.catch(e => console.log(e.message));

    });



});



