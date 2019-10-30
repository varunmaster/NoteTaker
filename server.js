var express = require("express");
var path = require("path"); 
var connection = require("./connection.js");

var PORT = 8080;

var app = express();

app.use(express.urlencoded({ extended: true })); //this is boiler plate info and should just be pasted from other server.js files
app.use(express.json());

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
