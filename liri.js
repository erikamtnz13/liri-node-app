////////////////////KEYS ////////////////////

var keys = require("./keys.js");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;


var command = process.argv[2];

if (!command) {
	console.log("👉  Please select from one of the following commands: my-tweets, spotify-this-song, movie-this, or do-what-it-says. Thank you.");	
}

else {

switch (command) {
	case "my-tweets":
	twitter();	
		break;

	case "spotify-this-song":
	spotify();	
		break;
	
	case "movie-this":
	omdb();	
		break;

	case "do-what-it-says":
	readfs();	
		break;

}


//////////////////Twitter////////////////////////

function twitter() {
		var Twitter = require('twitter');
 
		var client = new Twitter(twitterKeys);
		 
		var params = {screen_name: 'codecamp_erika',count: 20};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
			console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");
			console.log("");
		  	for (var i = 0; i < tweets.length; i++) {			
				console.log(tweets[i].text + "   " + tweets[i].created_at);
			  }
			console.log("");
			console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");		    
		  }
		});
}

//////////////////////SPOTIFY/////////////////////
function spotify() {

	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify(spotifyKeys);
	var music = process.argv[3];

	if (music) {
		music = music;
		
	} else if (!music) {
		music = 'The Sign';
				
	}
		spotify.search({ type: 'track', query: music }, function (err, data) {
			if (err) {
	    		return console.log('Error occurred: ' + err);
	  		} else {
				console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");	
				console.log("");
	  			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	  			console.log("Song: " + data.tracks.items[0].name);
	  			console.log("Preview: " + data.tracks.items[0].preview_url);
	  			console.log("Album: " + data.tracks.items[0].album.name);
				console.log("");
				console.log("🎶  Please enter the name of another song.")
				return console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");
					
	  		}
	
	});

	}

///////////////////////////OMDB Code/////////////////////////	
function omdb() {
	
	var movieName = process.argv[3];

	if (movieName) {
		movieName = movieName;
	} 
	else if (!movieName){
		movieName = "Mr. Nobody";
	}
		
		var request = require("request");
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		request(queryUrl, function (error,response,body) {
			if (!error && response.statusCode === 200) {
				console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");	
				console.log("");
				console.log("Movie Title: " + JSON.parse(body).Title);
				console.log("Release Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
				console.log(JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value)
				console.log("Country: " + JSON.parse(body).Country)
				console.log("Language: " + JSON.parse(body).Language)
				console.log("Movie Plot: " + JSON.parse(body).Plot)
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("");
				console.log("❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖❖");	
				console.log("");
				return console.log("👉  Please enter the name of another movie.")
				
			}
			else if (error) {
					return console.log(error);
				}
		});
	}

//////////////////REQUIRE FS//////////////////////////
function readfs() {
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
}


