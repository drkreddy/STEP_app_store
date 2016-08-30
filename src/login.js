var unirest = require('unirest');
var utf8 = require('utf8');
var moment = require('moment-timezone');
var library = require("./library.js");
var constants = require("./constants.js");
var logFileName = "usersLog/usersLog.txt";

var generateGroupAccessUrl = function (accessToken, groupId) {
    return "https://graph.facebook.com/v2.7/" + groupId + "?fields=members.limit(10000)&access_token=" + accessToken;
};

var generatePersonalDetailsAccessUrl = function (accessToken) {
    return "https://graph.facebook.com/v2.7/me?fields=email%2Cgender%2Cname&access_token=" + accessToken;
};

var isAGroupMember = function (members, currentUserId) {
    return members.some(function (member) {
        return member.id === currentUserId;
    })
};

var createDataForLogging = function (data) {
    data.email = utf8.decode(data.email);
    data.loginAt = moment(new Date().toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma');
    return JSON.stringify(data)+ '\n';
};

module.exports = function (req, res, groupId) {
    var accessToken = req.body.accessToken;
    var userId = req.body.userId;
    var groupUrl = generateGroupAccessUrl(accessToken, groupId);
    unirest.get(groupUrl)
        .end(function (response) {
            if (response.body) {
                var members = (JSON.parse(response.body)).members.data;
                if (isAGroupMember(members, userId)) {
                    unirest.get(generatePersonalDetailsAccessUrl(accessToken))
                        .end(function (result) {
                            var responseData = JSON.parse(result.body);
                            library.createLog(constants.usersLogFileName, createDataForLogging(responseData));
                            var username = responseData.name;
                            library.setCookie(req, res, {key: "userId", value: userId});
                            library.setCookie(req, res, {key: "username", value: username});
                            res.send({redirectTo: "/update.html"});
                        });
                } else {
                    res.send({redirectTo: "/rejection.html"});
                }
            } else {
                console.log(response);
                res.send({errorMessage: "There is a unexpected issue with server"});
            }
        });
};


