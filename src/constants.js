const TABLE_NAME = "projects";
const ATTRIBUTES_DETAILS = ["uuid UUID PRIMARY KEY", "projectName varchar(200)", "websiteLink varchar(300)",
    "briefDescription varchar(5000)", "sourceLink varchar(500)", "usedLanguages varchar(500)",
    "usedFrameworks varchar(9000)", "developedBy varchar(1000)", "uploadBy varchar(200)", "uploadedOn timestamp", "uploadedByUserId varchar(25)"];
const ATTRIBUTES = ["uuid", "projectName", "websiteLink", "briefDescription", "sourceLink",
    "usedLanguages", "usedFrameworks", "developedBy", "uploadBy", "uploadedOn", "uploadedByUserId"];

module.exports = function () {
    return {
        tableName: TABLE_NAME,
        attributeDetails: ATTRIBUTES_DETAILS,
        attributes: ATTRIBUTES,
        serverLogFileName: "log/serverErrorLog.txt",
        usersLogFileName: "log/usersLog.txt"
    };
}();