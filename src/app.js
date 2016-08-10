var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require("moment-timezone");

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");
var library = require("./src/library.js");

var app = express();

var login = function (req, res) {
    var details = JSON.parse(req.user);
    //if req.user is undefined then it will throw an error
    res.cookie('username', (details.first_name + " " + details.last_name), {
        expires: new Date(Date.now() + 1000 * 60 * 15),
        httpOnly: true
    });
    res.redirect("/update.html");
};

var submitProject = function (req, res) {
    var username = req.cookies.username || "";
    var values = [req.body.projectName, req.body.siteLink, req.body.briefDescription, req.body.sourceLink, username, moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma')];
    var client = req.getClient();
    dbLib.insertNewData(client, constants.tableName, constants.attributes, values);
    library.retrieveAllProjects(client, constants.tableName, req.projects);
    res.redirect("/index.html")
};

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8000/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'name']
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile._raw);
    }
));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('HTML'));

app.use(passport.initialize());
passport.serializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {session: false, failureRedirect: "/login.html"}),
    function (req, res) {
        //Write the group login logic here
        //if the user belongs to a specific group then redirect to /update.html
        //else redirect to /rejection.html
        login(req, res);
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