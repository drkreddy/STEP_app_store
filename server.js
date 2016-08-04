var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var PORT = 8000;

var app = express();
var login = function (req, res) {
    res.cookie("username",req.body.username);
    res.redirect("/update.html");
};

var submitProject = function (req, res, next) {
    res.redirect("/index.html")
};
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('HTML'));

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.get("^/loginAs$",function(req,res){
   res.send({name: req.cookies.username ||""})
});

app.post("^/login$", login);


app.post("^/submit$",submitProject);

var server = http.createServer(app);

server.listen(PORT, function () {
    console.log("server is listening on port ", PORT);
});