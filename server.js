var http = require("http");
var express = require("express");

var PORT = 8000;

var app = express();
var login = function (req, res) {
    res.redirect("/update.html");
};

app.use(express.static('./HTML'));

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.post("^/login$", login);
var submitProject = function (req, res, next) {
    res.redirect("/index.html")
};

app.post("^/submit$",submitProject);

var server = http.createServer(app);

server.listen(PORT, function () {
    console.log("server is listening on port ", PORT);
});