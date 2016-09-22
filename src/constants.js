const PROJECT_TABLE_NAME = "projects";

const PROJECT_TABLE_ATTRIBUTES_DETAILS = ["uuid UUID PRIMARY KEY", "projectName varchar(200)", "websiteLink varchar(300)",
    "briefDescription varchar(5000)", "sourceLink varchar(500)", "usedLanguages varchar(500)",
    "usedFrameworks varchar(9000)", "developedBy varchar(1000)", "uploadBy varchar(200)", "uploadedOn timestamp", "uploadedByUserId varchar(25)", "projectLogo varchar(200)"];

const PROJECT_TABLE_ATTRIBUTES = ["uuid", "projectName", "websiteLink", "briefDescription", "sourceLink",
    "usedLanguages", "usedFrameworks", "developedBy", "uploadBy", "uploadedOn", "uploadedByUserId", "projectLogo"];

const PROJECT_TABLE_EDITABLE_ATTRIBUTES = ["projectName", "websiteLink", "briefDescription", "sourceLink",
    "usedLanguages", "usedFrameworks", "developedBy", "uploadedOn", "projectLogo"];

const COMMENT_TABLE_NAME = "commentsTable";

const COMMENT_TABLE_ATTRIBUTES_DETAILS = ["uuid UUID PRIMARY KEY", "projectUuid varchar(35) NOT NULL", "commentatorId varchar(35)",
    "commentatorName varchar(200)", "commentedOn timestamp", "contents varchar(5000)"];

const COMMENT_TABLE_ATTRIBUTES = ["uuid", "projectUuid", "commentatorId", "commentatorName", "commentedOn", "contents"];

const COMMENT_TABLE_EDITABLE_ATTRIBUTES = ["commentedOn", "contents"];

var getAllTablesDetails = function () {
    return [
        {
            name: PROJECT_TABLE_NAME,
            attributes: PROJECT_TABLE_ATTRIBUTES,
            editableAttributes: PROJECT_TABLE_EDITABLE_ATTRIBUTES,
            attributeDetails: PROJECT_TABLE_ATTRIBUTES_DETAILS
        },
        {
            name: COMMENT_TABLE_NAME,
            attributes: COMMENT_TABLE_ATTRIBUTES,
            editableAttributes: COMMENT_TABLE_EDITABLE_ATTRIBUTES,
            attributeDetails: COMMENT_TABLE_ATTRIBUTES_DETAILS
        }
    ];
};

module.exports = function () {
    return {
        projectTableName: PROJECT_TABLE_NAME,
        projectTableAttributeDetails: PROJECT_TABLE_ATTRIBUTES_DETAILS,
        projectTableAttributes: PROJECT_TABLE_ATTRIBUTES,
        projectTableEditableAttributes: PROJECT_TABLE_EDITABLE_ATTRIBUTES,
        commentTableName: COMMENT_TABLE_NAME,
        commentTableAttributeDetails: COMMENT_TABLE_ATTRIBUTES_DETAILS,
        commentTableAttributes: COMMENT_TABLE_EDITABLE_ATTRIBUTES,
        commentTableEditableAttributes: COMMENT_TABLE_EDITABLE_ATTRIBUTES,
        serverLogFileName: "log/serverErrorLog.txt",
        usersLogFileName: "log/usersLog.txt",
        logosPath : "images/logos/",
        getAllTablesDetails: getAllTablesDetails
    };
}();