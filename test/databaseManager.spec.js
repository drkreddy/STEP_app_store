'use strict';
var chai = require("chai");
var expect = chai.expect;
var dblib = require("../src/databaseManager");

describe("dbLib", function () {
    it("should create query for insert data into a table from give table name and attributes", function () {
        let query = dblib.makeInsertQuery("table1", ["uuid", "projectName"], ["123yuwbx21", "sample"]);
        let expected = "insert into table1 (uuid,projectName) values ('123yuwbx21','sample');";
        expect(query).to.equal(expected);
    });

    it("should create a retrival query from given table name and condition", function () {
        let query = dblib.makeRetrieveQuery("table1", "uuid='123'");
        let expected = "select * from table1 where uuid='123';";
        expect(query).to.equal(expected);
    });

    it("should not add where clause when create a retrival query from given table name only", function () {
        let query = dblib.makeRetrieveQuery("table1");
        let expected = "select * from table1;";
        expect(query).to.equal(expected);
    });

    it("should create update query", function () {
        let query = dblib.makeUpdateQuery("table1", ["projectName"], ["test"], "123yu");
        let expected = "update table1 set projectName='test' where uuid='123yu';";
        expect(query).to.equal(expected);
    });
});