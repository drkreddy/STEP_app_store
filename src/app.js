var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require("moment-timezone");

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");
var library = require("./library.js");
var groupLogin = require("./login.js");
var fs = require("fs");
var app = express();

var groupId = "282099168624476";
var logFile = "log.txt";

var login = function (req, res) {
    groupLogin(req, res, groupId);
};

var submitProject = function (req, res) {
    var username = req.cookies.username || "";
    var values = [req.body.projectName, req.body.siteLink, req.body.briefDescription, req.body.sourceLink, username, moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma')];
    var client = req.getClient();
    dbLib.insertNewData(client, constants.tableName, constants.attributes, values);
    library.retrieveAllProjects(client, constants.tableName, req.projects);
    res.redirect("/index.html")
};

var chooseEnvironment = function () {
    var details;
    if (process.env.FACEBOOK_APP_ID) {
        details = {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET
        }
    } else {
        details = {
            clientID: process.env.localFbId,
            clientSecret: process.env.localFbSecret
        }
    }
    details.callbackURL = "http://localhost:8000/auth/facebook/callback";
    //For now callback url is same for both. But later it will be different,
    // one is actual site domain and another for local domain
    details.profileFields = ['id', 'email', 'gender', 'name'];
    return details;
};

var logUsers = function(userDetails){
    fs.appendFile(logFile,userDetails,function(){});
};

passport.use(new FacebookStrategy(chooseEnvironment(),
    function (accessToken, refreshToken, profile, done) {
        done(null, profile._raw);
    }
));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('HTML'));

app.use(passport.initialize());

app.use(function(req,res,next){
    console.log("requested url is -> ",req.url);
    next();
});
passport.serializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {session: false, failureRedirect: "/login.html"}),
    function (req, res) {
        var details = JSON.parse(req.user);
        logUsers(JSON.stringify(details));
        console.log(details);
        library.setCookie(req, res, {key: "username", value: details.first_name + " " + details.last_name});
        res.send();
    });

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.get("^/loginAs$", function (req, res) {
    res.send({name: req.cookies.username || ""})
});

app.post("^/login$", login);


app.post("^/submit$", submitProject);

module.exports = app;