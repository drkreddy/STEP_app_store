var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require("moment-timezone");

var dbLib = require("./databaseManager.js");
var constants = require("./constants.js");

var app = express();

var login = function (req, res) {
    res.cookie("username", req.body.username);
    res.redirect("/update.html");
};

var submitProject = function (req, res, next) {
    var username = req.cookies.username || "";
    var values = [req.body.projectName, req.body.siteLink, req.body.briefDescription, req.body.sourceLink, username, moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma')];
    dbLib.insertNewData(req.getClient(), constants.tableName, constants.attributes, values);
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
        res.redirect("/update.html");
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