var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "us-west-2",
    // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
    region: "us-west-2",
    accessKeyId:"AKIAJKK4AT63DDUIYYVA",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};