$(document).ready(function() {
  $(".navbar-toggle").on("click", function () {
    $(this).toggleClass("active");
  });
var apiKey = "cb6a30e95d827e83a94394acaee07397";
var queryURL = ""
  $.ajax({
    url: "",
    method: "GET"
  }).done(function(response){
    console.log(response)
  })
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

  var email = $("#emailInput");
  var password = $("#passwordInput");
  var btnLogin = $("#login");
  var btnSignUp = $("#signUp");



  $("#loginForm").click(function(e){
    e.preventDefault();
    $(".logged-out-img").hide()
    $("#signUp").hide();
    $("form").removeClass("hidden");
    $("#login").show();

  })

    $("#signUpForm").click(function(e){
    e.preventDefault();
    $(".logged-out-img").hide()    
    $("#login").hide();
    $("form").removeClass("hidden")
    $("#signUp").show();
   })


   $("#login").on("click", function (e){
    console.log("hello")
    e.preventDefault();
        //get email and password values
    email = email.val().trim();
    password = password.val().trim();
    //sign in
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));

  });

   $("#signUp").on("click", function (e){
    e.preventDefault();
        //get email and password values
    email = email.val().trim();
    password = password.val().trim();
    //sign in
    var promise = auth.createUserWithEmailAndPassword(email, password);
    var loginError = promise.catch(e => console.log(e.message));



   })

    $("#logOut").on("click", function(){
    auth.signOut();
    document.location.reload();
    })
    //add a realtime listener
    auth.onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser){
        console.log(firebaseUser)
        $(".link").hide();
        $("form").hide();
        $("#loggedOutDisplay").hide();
        $("#loggedInDisplay").removeClass("hidden");
        $("#loggedInDisplay").addClass("display")
        $(".petName").removeClass("hidden");
        $("#logOut").removeClass("hidden");

      }else{
        console.log("not logged in")
      }
    });

var connectionsRef = db.ref("/connections");
var connectedRef = db.ref(".info/connected");
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});



});



