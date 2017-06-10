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
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '228126044356258',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
    //check log in status
FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
    console.log(response)
    
    var provider = firebase.auth.FacebookAuthProvider();
    provider.catch(e => console.log(e.message));
  }
  else if(response.status === "not_authorized"){
    console.log("not logged in")
    FB.login();
  }
});
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     console.log(location.protocol);

     var protocol = "http:";
     if (location.protocol == "https:") {
        protocol = "https:";
     }
     js.src = protocol + "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  $("#logout").on("click", function(){
    FB.logout(function(response){
        console.log("logged out")
        document.location.reload();       
    })
  })
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