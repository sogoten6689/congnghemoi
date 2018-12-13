var AWSConnect = require("../connectAWS/ConnectAWS");
var dynamodb = AWSConnect.dynamoConnection;

var params = {
    TableName: "Carts",
    KeySchema: [
        { AttributeName: "no", KeyType: "HASH"},
        { AttributeName: "name", KeyType: "RANGE"}
    ],
    AttributeDefinitions : [
        {AttributeName:"no", AttributeType:"N"},
        {AttributeName:"name", AttributeType:"S"}
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