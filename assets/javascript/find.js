$(document).ready(function() {



 var apiKey = "cb6a30e95d827e83a94394acaee07397";
 var url = 'http://api.petfinder.com/pet.find?';
 url += '&format=json&key=' + apiKey;
 console.log(url)
 var petInfo = [];

$.ajax({
	type: "GET",
	data: {},
	url: url + "&callback=?",
	dataType: "json",
	success: function(data) {
		var petfinder = data.petfinder;
		console.log(petfinder)
		petInfo = [];
		for (i=0; i < petfinder.length; i++) {
			var photo = petfinder[i].name["$t"];
			var name = petfinder[i].name["$t"];
			var description = petfinder[i].description["$t"];
			petInfo.push({description,photo,name});
	};
	$("#showPet").attr("src", petInfo[0].photo);
	$("#name").html(petInfo[0].name);
	$(".description").html(petInfo[0].description)
	}

}); //end of ajax call// 
console.log(petInfo);

});      