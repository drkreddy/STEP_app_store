var dbLib = require("./databaseManager.js");
var fs = require("fs");

var retrieveAllProjects = function (client, tableName, projects) {
    var retrieveQuery = dbLib.makeRetrieveQuery(tableName);
    client.query(retrieveQuery, function (err, result) {
        projects = result;
    })
};

var setup = function (client, tableName, attributeDetails, projects) {
    dbLib.createTable(client, tableName, attributeDetails);
    retrieveAllProjects(client, tableName, projects)
};

var setCookie = function (req, res, details) {
    res.cookie(details.key, details.value, {
        expires: new Date(Date.now() + 1000 * 60 * 15),
        httpOnly: true
    });
};

var clearCookie = function (req, res, field) {
    res.clearCookie(field);
};

var logUsers = function (logFileName, userDetails) {
    fs.appendFile(logFileName, userDetails, function () {
    });
};

module.exports = {
    setup: setup,
    retrieveAllProjects: retrieveAllProjects,
    setCookie: setCookie,
    clearCookie: clearCookie,
    logUsers: logUsers
};