var fs = require("fs");
var utf8 = require('utf8');
var moment = require('moment-timezone');

var createLog = function (logFileName, data) {
    fs.appendFile(logFileName, data, function () {
    });
};

var modifyErrorForServerLog = function (err, query) {
    return JSON.stringify({
            message: err.message,
            query: query,
            stackTrace: err.stack
        }) + "\n***************************\n";
};

var createDataForLogging = function (data) {
    data.email = utf8.decode(data.email);
    data.loginAt = moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma');
    return JSON.stringify(data) + '\n';
};

module.exports = {
    createLog: createLog,
    manipulateError: modifyErrorForServerLog,
    createDataForLogging: createDataForLogging
};