$(document).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('redirect user here');

        // window.location.href = 'profile.html';

        // User is signed in.
      } else {
        window.location.href = 'index.html';
        console.log('no user');
        // No user is signed in.
      }
    });

});