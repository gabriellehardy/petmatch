$(document).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user logged in, redirecting..');

        window.location.href = 'profile.html';

        // User is signed in.
      } else {
        console.log('no user');
        // No user is signed in.

        $("#login").on("click", function(e) {
            console.log("logging in..");
            e.preventDefault();
            //get email and password values
            email = $("#emailInput").val().trim();
            password = $("#passwordInput").val().trim();
            //sign in
            var promise = firebase.auth().signInWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));

        });
      }

    });
});
