var unirest = require('unirest');
var library = require("./library.js");


var generateGroupAccessUrl = function (accessToken, groupId) {
    return "https://graph.facebook.com/v2.7/" + groupId + "?fields=members.limit(10000)&access_token=" + accessToken;
};

var isAGroupMember = function (members, currentUserId) {
    return members.some(function (member) {
        return member.id === currentUserId;
    })
};

module.exports = function (req, res, groupId) {
    var accessToken = req.body.accessToken;
    var userId = req.body.userId;
    var username = req.body.name;
    var groupUrl = generateGroupAccessUrl(accessToken, groupId);
    unirest.get(groupUrl)
        .end(function (response) {
            var responsePage = "/rejection.html";
            if (response.body) {
                library.logUsers("json.json", response.body);
                var members = (JSON.parse(response.body)).members.data;
                if (isAGroupMember(members, userId)) {
                    library.setCookie(req, res, {key: "userId", value: userId});
                    library.setCookie(req, res, {key: "username", value: username});
                    responsePage = "/update.html";
                }
                res.send({redirectTo: responsePage});
            } else {
                res.send({errorMessage: "There is a unexpected issue with server"});
            }
        });
};


