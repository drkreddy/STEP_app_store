var dbLib = require("./databaseManager.js");

var setup = function (client, tableName, attributeDetails) {
    dbLib.createTable(client, tableName, attributeDetails);
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
    setCookie: setCookie,
    clearCookie: clearCookie,
    updateCookies: updateCookies
};