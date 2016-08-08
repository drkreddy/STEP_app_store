var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require("moment-timezone");
var pg = require("pg");
var dbLib = require("./src/databaseManager.js");

const TABLE_NAME = "projects";
const ATTRIBUTES_DETAILS = ["projectName varchar(200)", "websiteLink varchar(300)", "briefDescription varchar(5000)", "sourceLink varchar(500)", "uploadBy varchar(200)", "uploadedOn timestamp"];
const ATTRIBUTES = ["projectName", "websiteLink", "briefDescription", "sourceLink", "uploadBy", "uploadedOn"];
const PORT = 8000;

var projects = [];
var conString = process.env.PGSQL_CONSTRING;

// connectionString syntax
// 'pg://' + POSTGRESQL_DB_USERNAME + ':' + POSTGRESQL_DB_PASSWORD + '@' + POSTGRESQL_DB_HOST + ':' + POSTGRESQL_DB_PORT + '/'+ 'DATABASE_NAME';

var CLIENT = new pg.Client(conString);
CLIENT.connect();

var setup = function (client, tableName, attributeDetails) {
    dbLib.createTable(client, tableName, attributeDetails);
    retrieveAllProjects(client, tableName)
};

var app = express();
var login = function (req, res) {
    res.cookie("username", req.body.username);
    res.redirect("/update.html");
};

var submitProject = function (req, res, next) {
    var username = req.cookies.username || "";
    var values = [req.body.projectName, req.body.siteLink, req.body.briefDescription, req.body.sourceLink, username, moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma')];
    dbLib.insertNewData(CLIENT, TABLE_NAME, ATTRIBUTES, values);
    res.redirect("/index.html")
};

var retrieveAllProjects = function (client, tableName) {
    var retrieveQuery = dbLib.makeRetrieveQuery(tableName);
    client.query(retrieveQuery, function (err, result) {
        projects = result;
    })
};

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('HTML'));

app.get("/uploadNewProject", function (req, res) {
    res.redirect("/login.html");
});

app.get("^/loginAs$", function (req, res) {
    res.send({name: req.cookies.username || ""})
});

app.post("^/login$", login);


app.post("^/submit$", submitProject);

var server = http.createServer(app);

server.listen(PORT, function () {
    setup(CLIENT, TABLE_NAME, ATTRIBUTES_DETAILS);
    console.log("server is listening on port ", PORT);
});