var app = require('./app.js');

module.exports = function (projects,client) {
    return function (req, res, next) {
        req.projects = projects;
        req.getClient = function () {
            return client;
        };
        app(req, res, next)
    }
};