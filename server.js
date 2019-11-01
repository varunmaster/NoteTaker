var express = require("express");
var mysql = require("mysql");
//var connection = require("./connection.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "notetaker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // connection.end();
});

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true })); //this is boiler plate info and should just be pasted from other server.js files
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
