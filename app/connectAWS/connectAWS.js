var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "us-west-2",
    // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
    region: "us-west-2",
    accessKeyId:"AKIAIDDKELIIWHSJBD4Q",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};