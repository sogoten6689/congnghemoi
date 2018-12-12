var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "us-west-2",
    // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
    region: "us-west-2",
    accessKeyId:"AKIAI5L6ZNWF6JRR2FEA",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};