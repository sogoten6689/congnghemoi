var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "us-west-2",
    // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
    region: "us-west-2",
    accessKeyId:"AKIAJA37NNNKDIP6SAXA",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};