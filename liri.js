////////////////////KEYS ////////////////////

var keys = require("./keys.js");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;


var command = process.argv[2];


//////////////////Twitter////////////////////////

if (command === "my-tweets") {
		var Twitter = require('twitter');
 
		var client = new Twitter(twitterKeys);
		 
		var params = {screen_name: 'codecamp_erika',count: 20};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log(tweets[i].text + "   " + tweets[i].created_at);
		  	}
		    
		  }
		});
}

//////////////////////SPOTIFY/////////////////////
else if (command === "spotify-this-song") {

	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify(spotifyKeys);
	var music = process.argv[3];

	if (music) {
		music = music;
		
	} else if (!music) {
		music = 'Imitadora';
				
	}
		spotify.search({ type: 'track', query: music }, function (err, data) {
			if (err) {
	    		return console.log('Error occurred: ' + err);
	  		} else {
	  			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	  			console.log("Song: " + data.tracks.items[0].name);
	  			console.log("Preview: " + data.tracks.items[0].preview_url);
	  			console.log("Album: " + data.tracks.items[0].album.name);
	  			return console.log("Please enter the name of another song.");
	  		}
	
	});

	}

else if (command === "movie-this") {
	
///////////////////////////OMDB Code/////////////////////////
	var movieName = process.argv[3];

	if (movieName) {
		
		var request = require("request");
		movieName = process.argv[3];
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		request(queryUrl,function (error,response,body) {
			if (!error && response.statusCode === 200) {
				console.log("Movie Title: " + JSON.parse(body).Title + " * Release Year: " + JSON.parse(body).Year + " * IMDB Rating: " + JSON.parse(body).imdbRating + 
					" * " + JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value + " * Country: " + JSON.parse(body).Country + " * Language: " + JSON.parse(body).Language + " * Movie Plot: " + JSON.parse(body).Plot + " * Actors: " + JSON.parse(body).Actors);
			}
			else if (error) {
					return console.log(error);
				}
		});
	}

	else if (!movieName) {
			return console.log("Please enter the name of a movie.")
	}


}

//////////////////REQUIRE FS//////////////////////////
else if (command === "do-what-it-says") {
	var fs = require("fs");
		fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
    return console.log(error);
  	}
	var dataArr = data.split(",");
	var song = dataArr[1];
	console.log("Spotifying this song: " + song);

		var Spotify = require('node-spotify-api');
 		var spotify = new Spotify(spotifyKeys);

		spotify.search({ type: 'track', query: song }, function (err, data) {
			if (err) {
	    		return console.log('Error occurred: ' + err);
	  		} else {
	  			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	  			console.log("Song: " + data.tracks.items[0].name);
	  			console.log("Preview: " + data.tracks.items[0].preview_url);
	  			console.log("Album: " + data.tracks.items[0].album.name);
	  			return console.log("Please enter the name of another song.");
	  		}
	  		});	
	
	});
}

else {
	console.log("Please select from one of the following commands: my-tweets, spotify-this-song, movie-this, or do-what-it-says. Thank you.");
}
































