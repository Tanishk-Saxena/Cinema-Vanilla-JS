//jshint esversion: 6

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
  var query = req.body.movieName;
  var apiKey = "6d8ae39c";
  const url = "http://www.omdbapi.com/?apikey="+ apiKey + "&t=" + query;
  http.get(url, function(response){
    console.log(response.statusCode);
    response.setEncoding('utf8');
    response.on("data", function(data){
      const movieData = JSON.parse(data);
      const title = movieData.Title;
      const rating = movieData.Rated;
      const releasedDate = movieData.Released;
      const runtime = movieData.Runtime;
      const genre = movieData.Genre;
      const directors = movieData.Director;
      const actors = movieData.Actors;
      const plot = movieData.Plot;
      const poster = movieData.Poster;
      const type = movieData.Type;
      const imdb = movieData.imdbRating;
      res.write("<h1>"+title+"</h1>");
      res.write("<p>"+type+"</p>");
      res.write("<p>"+plot+"</p>");
      res.write("<p>"+genre+"</p>");
      res.write("<p>"+rating+"</p>");
      res.write("<p>"+imdb+"</p>");
      res.write("<p>"+actors+"</p>");
      res.write("<p>"+directors+"</p>");
      res.write("<p>"+releasedDate+"</p>");
      res.write("<p>"+runtime+"</p>");
      res.write("<img src = " + poster + ">");
      res.send();
    });
  });
});

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
