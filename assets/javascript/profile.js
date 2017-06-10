$(document).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('redirect user here');

        var user = firebase.auth().currentUser;

        $("#user-email").html(user.email);
        $("#avatar-img").attr('src', 'https://api.adorable.io/avatars/285/'+user.email);

        // User is signed in.
      } else {
        window.location.href = 'index.html';
        console.log('no user');
        // No user is signed in.
      }
    });


});