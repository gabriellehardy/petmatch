$(document).ready(function() {
  var uid;
  var favorites = []

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('redirect user here');

      var user = firebase.auth().currentUser;

      uid = user.uid;

      $("#user-email").html(user.email);
      $("#avatar-img").attr('src', 'https://api.adorable.io/avatars/285/'+user.email);


      firebase.database().ref('/users/' + uid + "/favorites").once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot, index) {

            $("#favorites").append('<div class="column is-one-quarter-desktop is-half-tablet"><div class="card animated slideInUp"><div class="card-image"><figure class="image is-4by3"><img src="'
              +childSnapshot.val().photo+
              '"></figure></div><div class="card-content"><div class="content has-text-centered"><h1 class="title is-5">' + 
              childSnapshot.val().name + '</h1><h2 class="subtitle is-6">' + 
              childSnapshot.val().breed + " | " + childSnapshot.val().sex
              +'</h2></div><footer class="card-footer"><a class="card-footer-item details" data-name="'+ childSnapshot.val().name + '" data-description="'+
              childSnapshot.val().description+'" >Details</a></footer>');

            $(".details").on("click", function(){

                var name = $(this).data("name");
                var description = $(this).data("description");

                $(".modal-card-title").html(name);
                $(".modal-card-body").html(description);

                $(".modal").addClass("is-active");

                $('.modal-background, .modal-close').click(function() {
                  $('html').removeClass('is-clipped');
                  $(this).parent().removeClass('is-active');
                });

            });

        });
      });

      // console.log(favorites);

      // console.log(usersRef);
      // User is signed in.
    } else {
      window.location.href = 'index.html';
      console.log('no user');
      // No user is signed in.
    }
  });


});