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

module.exports = {setup: setup, retrieveAllProjects: retrieveAllProjects};