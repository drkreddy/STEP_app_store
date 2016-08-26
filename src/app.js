var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require("moment-timezone");

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");
var library = require("./library.js");
var groupLogin = require("./login.js");

var app = express();

var groupId = "282099168624476";
var logFileName = "log.txt";

var login = function (req, res) {
    library.logUsers(logFileName, JSON.stringify(req.body) + "\n");
    groupLogin(req, res, groupId);
};

var isAlreadyLogedIn = function (req, res, next) {
    (req.cookies.userId && req.cookies.username) ? next() : res.redirect("/login.html");
};

var submitProject = function (req, res) {
    var username = req.cookies.username || "";
    var values = [req.body.projectName, req.body.siteLink, req.body.briefDescription, req.body.sourceLink, username, moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma')];
    var client = req.getClient();
    dbLib.insertNewData(client, constants.tableName, constants.attributes, values);
    library.retrieveAllProjects(client, constants.tableName, req.projects);
    res.redirect("/index.html")
};

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/update.html", isAlreadyLogedIn);

app.use(express.static('HTML'));

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.get("^/loginAs$", function (req, res) {
    res.send({name: req.cookies.username || ""})
});

app.get("^/logout$",function(req, res){
    console.log("-------", req.cookies);
    for(var cookieName in req.cookies){
        library.clearCookie(req, res, cookieName);
    }
    res.redirect("/index.html");
});

app.post("^/login$", login);

app.post("^/submit$", isAlreadyLogedIn, submitProject);

module.exports = app;