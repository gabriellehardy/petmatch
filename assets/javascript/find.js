$(document).ready(function() {

    
    $("#dog").click(function(){
            $('.toHide').hide();
            $("#sizeSelector").show('slow');
 
 	}); 


    $("#cat").click(function(){
            $('.toHide').hide();
            $("#sizeSelector").hide('slow');
 
 	});

	var favorites = [];
    var petInfo = [];
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
        //$("#searchPets").modal("toggle")
        function ajax(){
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
            if (age.length < 10){
                url += '&age=' + age;
            }
            if (size.length < 10){
                url += '&size=' + size.charAt(0).toUpperCase();
            }
            if (petInfo.length == 25){
              url += "&offset=lastOffset";
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
                    //petInfo = [];
                    for (i=0;i<petfinder.length;i++){
                        var photo = petfinder[i].media.photos.photo[2]["$t"];
                        var name = petfinder[i].name["$t"];
                        var description = petfinder[i].description["$t"];
                        //var petId = petfinder.id["$t"];

                        if (description == null){
                            description = "No description available"
                        }
                        else if (photo == null){
                            /*photo = url(insert photo location here)*/
                        }
                 
                        petInfo.push({description,photo,name});
                    }; 
                    //sets first animal info
                    $(".logged-in-img").attr("id","newImg");
                    $("#newImg").removeClass("logged-in-img");
                    $("#newImg").attr("src", petInfo[0].photo);
                    $("#name").html(petInfo[0].name);
                    $(".description").html(petInfo[0].description.substring(0,1000) + "&hellip;")
                    //sets all others
                    var i = 0;
                    $("#menu-right").on("click", function(){
                        i = (i+1)%petfinder.length;
                        $(".logged-in-img").attr("id","newImg");
                        $("#newImg").removeClass("logged-in-img");
                        $("#newImg").attr("src", petInfo[i].photo);
                        $("#name").html(petInfo[i].name);
                        $(".description").html(petInfo[i].description.substring(0,1000) + "&hellip;")

                    });
                    $("#menu-left").on("click", function(){
                        i = (i-1)%petfinder.length;
                        $(".logged-in-img").attr("id","newImg");
                        $("#newImg").removeClass("logged-in-img");
                        $("#newImg").attr("src", petInfo[i].photo);                
                        $("#name").html(petInfo[i].name);
                        $(".description").html(petInfo[i].description.substring(0,1000) + "&hellip;")                 
                    });                               
                },
                error: function(request, error) {
                    alert("Request: " + JSON.stringify(request))
                }

            });
        };

        ajax();
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