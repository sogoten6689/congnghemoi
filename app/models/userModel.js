var AWSConnect = require("../connectAWS/connectAWS");
var dynamodb = AWSConnect.dynamoConnection;

var params = {
    TableName: "Users",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: "email", KeyType: "RANGE"}
    ],
    AttributeDefinitions : [
        {AttributeName:"id", AttributeType:"S"},
        {AttributeName:"email", AttributeType:"S"}
    ],
    ProvisionedThroughput: {
    ReadCapacityUnits:1,
    WriteCapacityUnits:1
}
};
var createTable = dynamodb.createTable(params,function (err, data) {
    if(err)
        console.log("Unable to create table. Error Json: ",JSON.stringify(err,null,2));
    else
        console.log("Created table. Table description Json: ",JSON.stringify(data,null,2));
});

module.exports = {
    createTable : createTable
};