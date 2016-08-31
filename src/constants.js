const TABLE_NAME = "projects";
const ATTRIBUTES_DETAILS = ["projectName varchar(200)", "websiteLink varchar(300)",
    "briefDescription varchar(5000)", "sourceLink varchar(500)", "usedLanguages varchar(500)",
    "usedFrameworks varchar(9000)", "developedBy varchar(1000)", "uploadBy varchar(200)", "uploadedOn timestamp"];
const ATTRIBUTES = ["projectName", "websiteLink", "briefDescription", "sourceLink",
    "usedLanguages", "usedFrameworks", "developedBy", "uploadBy", "uploadedOn"];

module.exports = function () {
    return {
        tableName: TABLE_NAME,
        attributeDetails: ATTRIBUTES_DETAILS,
        attributes: ATTRIBUTES,
        serverLogFileName: "log/serverLog.txt",
        usersLogFileName: "log/usersLog.txt"
    };
}();