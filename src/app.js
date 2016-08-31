var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");
var library = require("./library.js");
var groupLogin = require("./login.js");

var app = express();

var groupId = "282099168624476";

var login = function (req, res) {
    groupLogin(req, res, groupId);
};

var isAlreadyLogedIn = function (req, res, next) {
    (req.cookies.userId && req.cookies.username) ? next() : res.redirect("/login.html");
};

var submitProject = function (req, res) {
    var username = req.cookies.username || "";
    var body = req.body;
    var values = [body.projectName, body.siteLink, body.briefDescription, body.sourceLink, body.usedLanguages, body.usedFrameworks, body.developedBy, username, new Date().toISOString()];
    var client = req.getClient();
    var query = dbLib.makeInsertQuery(constants.tableName, constants.attributes, values);
    client.query(query, function (err, result) {
        if (err) {
            library.createLog(constants.serverLogFileName, JSON.stringify(err) + "\n-----------------------\n");
            res.status(500);
            res.redirect("/unexpectedIssue.html");
        } else
            res.redirect("/index.html")
    });
};

var getAllProjects = function (req, res) {
    var client = req.getClient();
    library.retrieveAllProjects(client, constants.tableName, req.projects);
    var retrieveQuery = dbLib.makeRetrieveQuery(constants.tableName);
    client.query(retrieveQuery, function (err, result) {
        if (err) {
            library.createLog(constants.serverLogFileName, JSON.stringify(err) + "\n-----------------------\n");
            res.status(500);
            res.redirect("/unexpectedIssue.html");
        } else
            res.send(result.rows);
    })
};

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(library.updateCookies);

app.get("/update.html", isAlreadyLogedIn);

app.use(express.static('HTML'));

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.get("/getAllProjects", getAllProjects);

app.get("^/loginAs$", function (req, res) {
    res.send({name: req.cookies.username || ""})
});

var isLoggedIn = function (cookies) {
    return !!(cookies.userId && cookies.username);
};

app.get("^/personalDetails", function (req, res) {
    res.send({isLoggedIn: isLoggedIn(req.cookies), username: (req.cookies.username || "user")});
});

app.get("^/logout$", function (req, res) {
    for (var cookieName in req.cookies) {
        library.clearCookie(req, res, cookieName);
    }
    res.redirect("/index.html");
});

app.post("^/login$", login);

app.post("^/submit$", isAlreadyLogedIn, submitProject);

module.exports = app;