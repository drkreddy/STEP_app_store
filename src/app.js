var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var uuid = require("uuid");

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");
var library = require("./library.js");
var groupLogin = require("./login.js");
var logger = require("./logger.js");

var app = express();

var groupId = "282099168624476";

var login = function (req, res) {
    groupLogin(req, res, groupId);
};

var isAlreadyLogedIn = function (req, res, next) {
    (req.cookies.userId && req.cookies.username) ? next() : res.redirect("/login.html");
};

var insertToDB = function (req, res, query) {
    var client = req.getClient();
    client.query(query, function (err, result) {
        if (err) {
            logger.createLog(constants.serverLogFileName, logger.manipulateError(err, query));
            res.status(500);
            res.redirect("/unexpectedIssue.html");
        } else
            res.redirect("/index.html")
    });
};

var submitProject = function (req, res) {
    var username = req.cookies.username || "";
    var userId = req.cookies.userId || "";
    var body = req.body;
    var values = [uuid.v4(), body.projectName, body.siteLink, body.briefDescription, body.sourceLink, body.usedLanguages, body.usedFrameworks, body.developedBy, username, new Date().toISOString(), userId];
    var query = dbLib.makeInsertQuery(constants.projectTableName, constants.projectTableAttributes, values);
    insertToDB(req, res, query);
};

var updateProject = function (req, res) {
    var body = req.body;
    var values = [body.projectName, body.siteLink, body.briefDescription, body.sourceLink, body.usedLanguages, body.usedFrameworks, body.developedBy, new Date().toISOString()];
    var query = dbLib.makeUpdateQuery(constants.projectTableName, constants.projectTableEditableAttributes, values, req.params.uuid);
    console.log(query);
    insertToDB(req, res, query)
};

var getProjects = function (client, query, res) {
    client.query(query, function (err, result) {
        if (err) {
            logger.createLog(constants.serverLogFileName, logger.manipulateError(err, query));
            res.status(500);
            res.redirect("/unexpectedIssue.html");
        } else
            res.send(result.rows);
    })
};

var getAllProjects = function (req, res) {
    var retrieveQuery = dbLib.makeRetrieveQuery(constants.projectTableName);
    getProjects(req.getClient(), retrieveQuery, res);
};

var getSpecificProject = function (req, res) {
    var condition = "uuid='" + req.params.uuid + "'";
    var query = dbLib.makeRetrieveQuery(constants.projectTableName, condition);
    getProjects(req.getClient(), query, res);
};

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(library.updateCookies);

app.get("^/uploadNewProject.html$", isAlreadyLogedIn);

app.use(express.static('HTML'));

app.get("^/getAllProjects$", getAllProjects);

app.get("^/project/:uuid$", getSpecificProject);

var isLoggedIn = function (cookies) {
    return !!(cookies.userId && cookies.username);
};

app.get("^/personalDetails$", function (req, res) {
    res.send({isLoggedIn: isLoggedIn(req.cookies), username: (req.cookies.username || "user"), userId: req.cookies.userId});
});

app.get("^/logout$", function (req, res) {
    for (var cookieName in req.cookies) {
        library.clearCookie(req, res, cookieName);
    }
    res.redirect("/index.html");
});

app.post("^/login$", login);

app.post("^/submit/project$", isAlreadyLogedIn, submitProject);

app.post("^/submit/project/:uuid$", isAlreadyLogedIn, updateProject);

module.exports = app;