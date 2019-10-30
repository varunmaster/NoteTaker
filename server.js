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

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

//this but be at the bottom bc if the user goes to any page it will match * so we put it at bottom
app.get("*", function (req, res) { //if user goes to any other site, default it to home
    res.sendFile(path.join(__dirname, "./index.html"));
});
