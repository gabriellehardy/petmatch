$(document).ready(function() {
    var uid;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('hey i remember you');

        uid = user.uid;

        // User is signed in.
      } else {
        window.location.href = 'index.html';
        console.log('no user');
        // No user is signed in.
      }

    });

    
    $("#dog").click(function(){
        $('.toHide').hide();
        $("#sizeSelector").show('slow'); 
 	}); 


    $("#cat").click(function(){
        $('.toHide').hide();
        $("#sizeSelector").hide('slow');
 	});

    var database = firebase.database();

    // console.log(favorites);


    var petInfo = [];
    var zipcode = "";
    var animal = "";
    var size = "";
    var age = "";
    var offset = 0;

    // $(".card").on("click", function(){
    //     if (state === "front"){
    //         $(this).children(".front").addClass("hidden")
    //         $(this).children(".back").removeClass("hidden")
    //         state = "back"
    //     } else if (state === "back"){
    //         $(this).children(".front").removeClass("hidden")
    //         $(this).children(".back").addClass("hidden")
    //         state = "front"
    //     }

    // });

    $(".favorite").on("click", function() {
        var index = $(this).data("value");

        firebase.database().ref('users/' + uid + "/favorites").push(petInfo[index]);
    });

    $(".details").on("click", function(){

        var target = $(this).data("target"); 
        console.log(target);

        $(target).addClass("is-active");
        // var index = this.value;
        // favorites.push(petInfo[index]);
        // database.ref().update({
        //     favorites: favorites
        // });
        // console.log(favorites);
    });




    $("#dog").on("click", function() {
        console.log("dog selected")
        $(".editAnimal").removeClass("hidden")
        $("#animalSelection").addClass("hidden")
        $("#animalField").prepend("<div id='animalSelected'></div>")
        $("#animalSelected").html("dog")

    })
    $("#cat").on("click", function() {
        console.log("cat selected")
        $(".editAnimal").removeClass("hidden")
        $("#animalSelection").addClass("hidden")
        $("#animalField").prepend("<div id='animalSelected'></div>")
        $("#animalSelected").html("cat")

    })
    $("#adult").on("click", function() {
        console.log("adult age selected")
        $(".editAge").removeClass("hidden")
        $("#ageSelection").addClass("hidden")
        $("#ageField").prepend("<div id='ageSelected'></div>")
        $("#ageSelected").html("adult")

    })
    $("#senior").on("click", function() {
        console.log("senior age selected")
        $(".editAge").removeClass("hidden")
        $("#ageSelection").addClass("hidden")
        $("#ageField").prepend("<div id='ageSelected'></div>")
        $("#ageSelected").html("senior")        
    })
    $("#small").on("click", function() {
        console.log("small size selected")
        $(".editSize").removeClass("hidden")
        $("#sizeSelection").addClass("hidden")
        $("#sizeField").prepend("<div id='sizeSelected'></div>")
        $("#sizeSelected").html("small")        
    })
    $("#medium").on("click", function() {
        console.log("medium size selected")
        $(".editSize").removeClass("hidden")
        $("#sizeSelection").addClass("hidden")
        $("#sizeField").prepend("<div id='sizeSelected'></div>")
        $("#sizeSelected").html("medium")         

    })
    $("#large").on("click", function() {
        console.log("large size selected")
        $(".editSize").removeClass("hidden")
        $("#sizeSelection").addClass("hidden")
        $("#sizeField").prepend("<div id='sizeSelected'></div>")
        $("#sizeSelected").html("large")        
    })
    $(".editAnimal").on("click", function(){
        console.log("working button")
        $(".editAnimal").addClass("hidden")
        $("#animalSelection").removeClass("hidden")
        $("#animalSelected").remove()       
    })
    $(".editAge").on("click", function(){
        console.log("working button")
        $(".editAge").addClass("hidden")
        $("#ageSelection").removeClass("hidden")
        $("#ageSelected").remove()       
    })
    $(".editSize").on("click", function(){
        console.log("working button")
        $(".editSize").addClass("hidden")
        $("#sizeSelection").removeClass("hidden")
        $("#sizeSelected").remove()       
    })

    $("#save").on("click", function(e) {
        e.preventDefault();
        //resets offset for new search
        offset = 0;
        //clears petInfo 
        function ajax(){
            petInfo = [];
            zipcode = $("#zipcode").val().trim();
            animal = $("#animalSelected").text();
            age = $("#ageSelected").text();
            size = $("#sizeSelected").text();
            var apiKey = "cb6a30e95d827e83a94394acaee07397";
            var url = 'https://api.petfinder.com/pet.find?';
            if (zipcode.length = 5){
                url += '&location=' + zipcode;
            }
            if (animal.length < 10){
                url += '&animal=' + animal;
            }
            if (age.length < 10){
                url += '&age=' + age;
            }
            if (size.length < 10){
                url += '&size=' + size.charAt(0).toUpperCase();
            }
            if (offset > 0){
                url += "&offset="+offset;
                $("#prevPage").removeClass("hidden")
            }else{
                $("#prevPage").addClass("hidden")
            }
            url += '&format=json&key=' + apiKey + "&count=9";
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
                    for (i=0;i<petfinder.length;i++){
						try {
							var photo = petfinder[i].media.photos.photo[2]["$t"];
						}
						catch(err){
							var photo = "petmatch/assets/images/dog-placeholder.jpg";
						}
                        var name = petfinder[i].name["$t"];
                        var description = petfinder[i].description["$t"];
                        if (description == null){
                            description = "No description available";
                        }
                        var pid = petfinder[i].id["$t"];
                        var email = petfinder[i].contact.email["$t"];
                        var breed = petfinder[i].breeds.breed["$t"];
                        if (breed == null){
                        	breed = "Breed Unavailable";
                        }
                        var sex = petfinder[i].sex["$t"];

                        petInfo.push({description,photo,name,pid,email,sex,breed});

                    }; 


                    for (i=0;i<petfinder.length;i++){
                        $("#image-"+i).attr("src",petInfo[i].photo)
                        $("#image-"+i).attr("class", "petImage")
                        $(".title-"+i).html(petInfo[i].name)
                        $("#modal-title"+i).html(petInfo[i].name)
                        // $("#modal-body"+i).html("<img src=\"" + petInfo[i].photo + "\"/>" + "<br>" + petInfo[i].breed + " | " + petInfo[i].sex + "<br>" + petInfo[i].description)
                        $("#modal-body"+i).html("<pre>"+petInfo[i].description+"</pre>")
                        $(".subtitle-"+i).html(petInfo[i].breed + " | " + petInfo[i].sex)
                        // $(".description-"+i).html(petInfo[i].description.substring(0,590) + "&hellip;")


                    }
                    $(".petContainer").removeClass("hidden");
                    //sets first animal info
                    // $(".logged-in-img").attr("id","newImg");
                    // $("#newImg").removeClass("logged-in-img");
                    // $("#newImg").attr("src", petInfo[0].photo);
                    // $("#name").html(petInfo[0].name);
                    // $(".description").html(petInfo[0].description.substring(0,1000) + "&hellip;")
                    // //sets all others
                    // var i = 0;
                    // $("#menu-right").on("click", function(){
                    //     i = (i+1)%petfinder.length;
                    //     $(".logged-in-img").attr("id","newImg");
                    //     $("#newImg").removeClass("logged-in-img");
                    //     $("#newImg").attr("src", petInfo[i].photo);
                    //     $("#name").html(petInfo[i].name);
                    //     $(".description").html(petInfo[i].description.substring(0,1000) + "&hellip;")

                    // });
                    // $("#menu-left").on("click", function(){
                    //     i = (i-1)%petfinder.length;
                    //     $(".logged-in-img").attr("id","newImg");
                    //     $("#newImg").removeClass("logged-in-img");
                    //     $("#newImg").attr("src", petInfo[i].photo);                
                    //     $("#name").html(petInfo[i].name);
                    //     $(".description").html(petInfo[i].description.substring(0,1000) + "&hellip;")                 
                    // });                               
                },
                error: function(request, error) {
                    alert("Request: " + JSON.stringify(request))
                }

            });
        };
        ajax();
        $("#nextPage").on("click", function(){
            console.log("works")
            offset += 9;
            ajax();
        })
        $("#prevPage").on("click", function(){
            console.log("works")
            offset -= 9;
            ajax();
        })
        /*$(".card").on("click", function(){
	            $(".modal").addClass("is-active")
	            $("#modal-title"+i).html(petInfo[i].name)
                $("#modal-body"+i).html(petInfo[i].breed + " | " + petInfo[i].sex + "<br>" + petInfo[i].description)
        })*/     
        console.log(petInfo);
        
    });


//  var apiKey = "cb6a30e95d827e83a94394acaee07397";
//  var url = 'http://api.petfinder.com/pet.find?';
//  url += '&format=json&key=' + apiKey;
//  console.log(url)
//  var petInfo = [];

// $.ajax({
// 	type: "GET",
// 	data: {},
// 	url: url + "&callback=?",
// 	dataType: "json",
// 	success: function(data) {
// 		var petfinder = data.petfinder;
// 		console.log(petfinder)
// 		petInfo = [];
// 		for (i=0; i < petfinder.length; i++) {
// 			var photo = petfinder[i].name["$t"];
// 			var name = petfinder[i].name["$t"];
// 			var description = petfinder[i].description["$t"];
// 			petInfo.push({description,photo,name});
// 	};
// 	$("#showPet").attr("src", petInfo[0].photo);
// 	$("#name").html(petInfo[0].name);
// 	$(".description").html(petInfo[0].description)
// 	}

// }); //end of ajax call// 
// console.log(petInfo);

});      