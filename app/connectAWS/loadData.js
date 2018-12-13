var AWSConnect = require("./connectAWS.js");
var docClient = AWSConnect.docClient;
var fs = require("fs");
var helper = require("../helpers/helper")
var accUsers = require("../data/user");

// var allUser = JSON.parse(fs.readFileSync("../data/user.js", "utf-8"));

accUsers.forEach( function (user) {
    // let no = helper.genrenateID();
    var user_params = {
        TableName: "Users",
        Item: {
            "id": user.id,
            "name": user.name,
            "pass": user.pass,
            "gender": user.gender,
            "number": user.number,
            "email": user.email,
            "type": user.type,
            "address": user.address
        }
    };

    docClient.put(user_params, function (err, data) {
        if (err){
            console.log(err + user.id);
        }else
            console.log("PutItem Successed: " + user.id);
    });
});

