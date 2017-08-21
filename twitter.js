var keys = require('./keys.js');
var random = require('./random.txt');
var action = process.argv[2];

switch(action) {

  case 'do-what-it-says':
    doThis();
    break;

  case 'movie-this':
    movie();
    break;

  case 'my-tweets':
    tweets();
    break;

  case 'spotify-this-song':
    spotify();
    break;

  default:
    console.log('not found')
    break;

}
//file reading function//
function doThis() {

  var fs = require('fs');

    fs.readFile('random.txt', 'utf8', function(error, data) {

        if (error) {
            return console.log(error);
        }
        console.log('random.txt updated');
    }); 
}
//omdb api function//
function movie() {

  var request = require('request');
  var movieName = process.argv[3];
    if (movieName != '') {
      movieName = movieName;
    } else {
      movieName = 'Mr. Nobody';
    }
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&tomatoes=true&y=&plot=short&r=json';

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

      if (!error && response.statusCode == 200) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
        console.log("Rotten Tomato Url: " + JSON.parse(body).tomatoURL);
      }
    });
}
//twitter api function//
function tweets() {

  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
   
  var params = {screen_name: 'codecamp_erika'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i <= 20; i++);
      console.log(tweets[i]);
    }
  });
}
//spotify api function//
function spotify() {

  var spotify = require('spotify');
  var music = process.argv[3];
  if (music != '') {
      music = music;
    } else {
      music = 'The Sign by Ace of Base';
    }

  spotify.search({ type: 'track', query: music }, function(error, data) {
      if (error) {
          console.log('Error occurred: ' + error);
          return;
      } else {
        console.log('Artist: ' + JSON.parse(body).Artist);
        console.log('Song: ' + JSON.parse(body).Song);
        console.log('Preview: ' + JSON.parse(body).Preview);
        console.log('Album: ' + JSON.parse(body).Album);
      }
  });

}