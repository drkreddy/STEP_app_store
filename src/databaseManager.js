var dbLib = {};
var constants = require("./constants.js");
var logger = require("./logger.js");

dbLib.createTable = function (client, tableName, attributesDetails) {
    var query = "create table if not exists " + tableName + " ( " + attributesDetails.join(",") + ");";
    this.runQuery(client, query);
};

dbLib.makeInsertQuery = function (tableName, attributes, values) {
    return "insert into " + tableName + " (" + attributes.join(",") + ")" + " values ('" + values.join("','") + "');";
};

dbLib.insertNewData = function (client, tableName, attributes, values) {
    var query = this.makeInsertQuery(tableName, attributes, values);
    this.runQuery(client, query);
};

dbLib.makeRetrieveQuery = function (tableName, condition) {
    condition = condition ? " where " + condition : "";
    return "select * from " + tableName + condition + ";";
};

dbLib.makeUpdateQuery = function (tableName, attributes, values, uuid) {
    var query = "update " + tableName + " set ";
    var attributesLength = attributes.length;
    for (var index = 0; index < attributesLength -1 ; index++) {
        query += attributes[index] + "='" + values[index] + "', ";
    }
    query += attributes[attributesLength -1 ] + "='" + values[attributesLength - 1] + "' where uuid='" + uuid + "';"
    return query;
};

dbLib.runQuery = function (client, query) {
    client.query(query, function (err, result) {
        if (err){
            logger.createLog(constants.serverLogFileName, logger.manipulateError(err, query));
        }
    });
};

module.exports = dbLib;