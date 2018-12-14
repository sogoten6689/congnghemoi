var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "us-west-2",
    // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
    region: "us-west-2",
    accessKeyId:"AKIAILHHVDNJJYSQEULQ",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};