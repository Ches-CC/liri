require("dotenv").config();
const axios = require("axios");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const fs = require("fs");

//capture command-line input, argv[2]-->command (Switch statement), argv[3+]-->search input
let command = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

let artist = "";
let songTitle = "";
let movieTitle = "";

switch (command) {
    case "concert-this":
        // console.log("Commanddddd!");
        if (userQuery === ""){
            artist = "Tool";
        }else{
            artist = userQuery;
        }
        axios
            .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function(response){
                let results = response.data[0];
                let concertTime = results.datetime;
                //Employ 'moment' to format the object's date
                formattedConcertTime = moment(concertTime).format("MM-DD-YYYY");
                console.log("\n----------\nArtist: " + artist + "\nVenue: " + results.venue.name + "\nLocation: " + results.venue.city + ", " + results.venue.region +
                "\nPerformance Date: " + formattedConcertTime + "\n----------");
            })
            .catch(function (error){
                console.log(error);
            });
            fs.appendFile("log.txt", ("\n" + command + "," + artist), function(err) {
                if (err) {
                  console.log(err);
                }else {
                  console.log("Log.txt has been updated with your concert query!!");
                }
            });
        break;

    case "spotify-this-song":
        // console.log("Spotiiify!");
        if (userQuery === ""){
            songTitle = "The Sign, Ace of Base";
        }else{
            songTitle = userQuery;
        }
        spotify
            .search({
                type: 'track',
                query: songTitle,
            }).then(function(data){
                let track = data.tracks.items[0];
                // console.log(track);
                console.log("\n----------\nArtist: " + track.album.artists[0].name + "\nTitle: " + songTitle 
                + "\nPreview Link: " + track.external_urls.spotify + "\nAlbum: " + track.album.name + "\n----------");
            }).catch(function(err){
                console.log("Error!!! " + err);
            });
            fs.appendFile("log.txt", ("\n" + command + "," + songTitle), function(err) {
                if (err) {
                  console.log(err);
                }else {
                  console.log("Log.txt has been updated with your special Spotify song search selection!!");
                }
            });
        break;

    case "movie-this":
        // console.log("Moooooovie!");
        if (userQuery === ""){
            movieTitle = "Mr. Nobody";
        }else{
            movieTitle = userQuery;
        }
        axios
            .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&plot=short")
            .then(function (response){
                let movie = response.data;
                console.log("\n----------" + "\nTitle: " + movie.Title + "\nReleased: " + movie.Year + "\nIMDB Rating: " + 
                movie.imdbRating + "\nMetacritic Metascore: " + movie.Metascore + "\nProduced in: " + movie.Country
                + "\nLanguage: " + movie.Language + "\nPlot Summary: " + movie.Plot + "\nActors: " + movie.Actors + "\n----------");
            })
            .catch(function (error) {
                console.log(error);
            });
            fs.appendFile("log.txt", ("\n" + command + "," + movieTitle), function(err) {
                if (err) {
                  console.log(err);
                }else {
                  console.log("Log.txt has been updated with your movie search info!!");
                }
            });
        break;
    case "do-what-it-says":
        // console.log("Command Central! Whoa!");
        fs.readFile("random.txt", "utf8", function(error, dataset){
            if(error){
                return console.log(error);
            }else{
                let dataArr = dataset.split(",");
                let command = dataArr[0];
                let userQuery = dataArr.slice(1).join(" ").toString();
                switch (command) {
                    case "concert-this":
                        // console.log("Commanddddd!");
                        if (userQuery === ""){
                            artist = "Tool";
                        }else{
                            artist = userQuery;
                        }
                        axios
                            .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
                            .then(function(response){
                                // console.log(responseObj);
                                let results = response.data[0];
                                let concertTime = results.datetime;
                                //Employ 'moment' to format the object's date
                                formattedConcertTime = moment(concertTime).format("MM-DD-YYYY");
                                console.log("\n----------\nArtist: " + artist + "\nVenue: " + results.venue.name + "\nLocation: " + results.venue.city + ", " + results.venue.region +
                                "\nPerformance Date: " + formattedConcertTime + "\n----------");
                            })
                            .catch(function (error){
                                console.log(error);
                            });
                            fs.appendFile("log.txt", ("\n" + command + "," + artist), function(err) {
                                if (err) {
                                  console.log(err);
                                }else {
                                    onsole.log("\n!!!----!!!\nUpgrade to Liri-PRO to log searches from Random.txt to Log.txt!!\nUpgrade to PRO with this SPECIAL OFFER" + 
                                    "\nAvailable Today Only: $9.99/mo or $89.99/yr!\nPRO-Members receive UNLIMITED Random.txt-to-Log.txt transfers!!\nUPGRADE to PRO now @ http://www.chesslee.com !!\n!!!----!!!");
                                }
                            });
                        break;
                
                    case "spotify-this-song":
                        // console.log("Spotiiify!");
                        if (userQuery === ""){
                            songTitle = "The Sign, Ace of Base";
                        }else{
                            songTitle = userQuery;
                        }
                        spotify
                            .search({
                                type: 'track',
                                query: songTitle,
                            }).then(function(data){
                                let track = data.tracks.items[0];
                                // console.log(track);
                                console.log("\n----------\nArtist: " + track.album.artists[0].name + "\nTitle: " + songTitle 
                                + "\nPreview Link: " + track.external_urls.spotify + "\nAlbum: " + track.album.name + "\n----------");
                            }).catch(function(err){
                                console.log("Error!!! " + err);
                            });
                            fs.appendFile("log.txt", ("\n" + command + "," + songTitle), function(err) {
                                if (err) {
                                  console.log(err);
                                }else {
                                    console.log("\n!!!----!!!\nUpgrade to Liri-PRO to log searches from Random.txt to Log.txt!!\nUpgrade to PRO with this SPECIAL OFFER" + 
                                    "\nAvailable Today Only: $9.99/mo or $89.99/yr!\nPRO-Members receive UNLIMITED Random.txt-to-Log.txt transfers!!\nUPGRADE to PRO now @ http://www.chesslee.com !!\n!!!----!!!");
                                }
                            });
                        break;
                
                    case "movie-this":
                        // console.log("Moooooovie!");
                        if (userQuery === ""){
                            movieTitle = "Mr. Nobody";
                        }else{
                            movieTitle = userQuery;
                        }
                        axios
                            .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&plot=short")
                            .then(function (response){
                                let movie = response.data;
                                console.log("\n----------" + "\nTitle: " + movie.Title + "\nReleased: " + movie.Year + "\nIMDB Rating: " + 
                                movie.imdbRating + "\nMetacritic Metascore: " + movie.Metascore + "\nProduced in: " + movie.Country
                                + "\nLanguage: " + movie.Language + "\nPlot Summary: " + movie.Plot + "\nActors: " + movie.Actors + "\n----------");
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                            fs.appendFile("log.txt", ("\n" + command + "," + movieTitle), function(err) {
                                if (err) {
                                  console.log(err);
                                }else {
                                    onsole.log("\n!!!----!!!\nUpgrade to Liri-PRO to log searches from Random.txt to Log.txt!!\nUpgrade to PRO with this SPECIAL OFFER" + 
                                    "\nAvailable Today Only: $9.99/mo or $89.99/yr!\nPRO-Members receive UNLIMITED Random.txt-to-Log.txt transfers!!\nUPGRADE to PRO now @ http://www.chesslee.com !!\n!!!----!!!");
                                }
                            });
                        break;
                }
            };
            
    });
    break;
};