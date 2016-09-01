var dbLib = require("./databaseManager.js");

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
        httpOnly: true,
        sameSite : true
    });
};

var clearCookie = function (req, res, field) {
    res.clearCookie(field);
};


var updateCookies = function (req, res, next) {
    var cookies = req.cookies;
    for (var cookieName in cookies) {
        setCookie(req, res, {key: cookieName, value: cookies[cookieName]});
    }
    next();
};

module.exports = {
    setup: setup,
    retrieveAllProjects: retrieveAllProjects,
    setCookie: setCookie,
    clearCookie: clearCookie,
    updateCookies: updateCookies
};