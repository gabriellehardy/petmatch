$(document).ready(function() {
    // $(".navbar-toggle").on("click", function() {
    //     $(this).toggleClass("is-active");
    // });





    $("#card").flip({
      trigger: 'click'
    });
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
    var petInfo = [];



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


    // $("#loginForm").click(function(e) {
    //     e.preventDefault();
    //     $(".logged-out-img").hide()
    //     $("#signUp").hide();
    //     $("form").removeClass("hidden");
    //     $("#login").show();

    // })

    // $("#signUpForm").click(function(e) {
    //     e.preventDefault();
    //     $(".logged-out-img").hide()
    //     $("#login").hide();
    //     $("form").removeClass("hidden")
    //     $("#signUp").show();
    // })


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

    $("#signUp").on("click", function(e) {
        e.preventDefault();
        //get email and password values
        email = email.val().trim();
        password = password.val().trim();
        //sign in
        var promise = auth.createUserWithEmailAndPassword(email, password);
        var loginError = promise.catch(e => console.log(e.message));

    })

    $("#logOut").on("click", function() {
        auth.signOut();
        document.location.reload();
    });



    //add a realtime listener
    // auth.onAuthStateChanged(function(firebaseUser) {
    //     if (firebaseUser) {
    //         console.log(firebaseUser)
    //         $(".link").hide();
    //         $("form").hide();
    //         $("#loggedOutDisplay").hide();
    //         $("#loggedInDisplay").removeClass("hidden");
    //         $("#loggedInDisplay").addClass("display");
    //         $(".petName").removeClass("hidden");
    //         $("#logOut").removeClass("hidden");
    //         $("#search").removeClass("hidden");
    //         $("#searchPetsBtn").removeClass("hidden");
    //         $("#browsePetsBtn").removeClass("hidden");

    //     } else {
    //         console.log("not logged in")
    //     }
    // });

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

    var zipcode = "";
    var animal = "";
    var size = "";
    var age = "";

    $("#dog").on("click", function() {
        console.log("dog selected")
        $("#animalSelected").html("dog")
    })
    $("#cat").on("click", function() {
        console.log("cat selected")
        $("#animalSelected").html("cat")
    })
    $("#adult").on("click", function() {
        console.log("adult age selected")
        $("#ageSelected").html("adult")
    })
    $("#senior").on("click", function() {
        console.log("senior age selected")
        $("#ageSelected").html("senior")
    })
    $("#small").on("click", function() {
        console.log("small size selected")
        $("#sizeSelected").html("small")
    })
    $("#medium").on("click", function() {
        console.log("medium size selected")
        $("#sizeSelected").html("medium")
    })
    $("#large").on("click", function() {
        console.log("large size selected")
        $("#sizeSelected").html("large")
    })

    $("#save").on("click", function(e) {
      e.preventDefault();
      $("#searchPets").modal("toggle")
        // gets values from search form in modal
        zipcode = $("#zipcode").val().trim();
        animal = $("#animalSelected").text();
        age = $("#ageSelected").text();
        size = $("#sizeSelected").text();
        var apiKey = "cb6a30e95d827e83a94394acaee07397";
        var url = 'http://api.petfinder.com/pet.find?';
        if (zipcode.length = 5){
            url += '&location=' + zipcode;
        }
        if (animal.length < 10){
            url += '&animal=' + animal;
        }
        if ( age.length < 10){
            url += '&age=' + age;
        }
        if (size.length < 10){
            url += '&size=' + size.charAt(0).toUpperCase();
        }
        url += '&format=json&key=' + apiKey;
        console.log(url)
        $.ajax({
            type: "GET",
            data: {},
            url: url + "&callback=?",
            dataType: "json",
            success: function(data) {
                var petfinder = data.petfinder.pets.pet;
                console.log(petfinder)
                //gets all animal info and pushes to petInfo array
                petInfo = [];
                for (i=0;i<petfinder.length;i++){
                    var photo = petfinder[i].media.photos.photo[2]["$t"];
                    var name = petfinder[i].name["$t"];
                    var description = petfinder[i].description["$t"];
                    if (photo = false){
                        
                    }
                    petInfo.push({description,photo,name});
                }; 
                //sets first animal info
                $(".logged-in-img").attr("id","newImg");
                $("#newImg").removeClass("logged-in-img");
                $("#newImg").attr("src", petInfo[0].photo);
                $("#name").html(petInfo[0].name);
                $(".description").html(petInfo[0].description)                
                //sets all others
                var i = 0;
                $("#menu-right").on("click", function(){
                  i = (i+1)%petfinder.length;
                $(".logged-in-img").attr("id","newImg");
                $("#newImg").removeClass("logged-in-img");
                $("#newImg").attr("src", petInfo[i].photo);                
                $("#name").html(petInfo[i].name);
                $(".description").html(petInfo[i].description)                  
                }); 
                $("#menu-left").on("click", function(){
                  i = (i-1)%petfinder.length;
                $(".logged-in-img").attr("id","newImg");
                $("#newImg").removeClass("logged-in-img");
                $("#newImg").attr("src", petInfo[i].photo);                
                $("#name").html(petInfo[i].name);
                $(".description").html(petInfo[i].description)                  
                });                               
            },
            error: function(request, error) {
                alert("Request: " + JSON.stringify(request))
            }

        });

console.log(petInfo)
    });

});



