var http = require('http');
var requestHandler = require('./src/routing.js');
var pg = require("pg");
var constants = require("./src/constants.js");
var library = require("./src/library.js");

var IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP;
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var projects = [];

var conString = process.env.PGSQL_CONSTRING;
// connectionString syntax
// 'pg://' + POSTGRESQL_DB_USERNAME + ':' + POSTGRESQL_DB_PASSWORD + '@' + POSTGRESQL_DB_HOST + ':' + POSTGRESQL_DB_PORT + '/'+ 'DATABASE_NAME';

var client = new pg.Client(conString);
client.connect();

var controller = requestHandler(projects, client);
var server = http.createServer(controller);

server.listen(PORT, IP_ADDRESS, function () {
    var tables = constants.getAllTablesDetails();
    tables.forEach(function(table){
        library.setup(client, table.name, table.attributeDetails);
    });
    console.log("server is listening on port ", PORT);
});