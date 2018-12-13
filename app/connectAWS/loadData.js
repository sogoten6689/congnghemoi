var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var fs = require("fs");
var helper = require("../helpers/helper")
var accUsers = require("../data/user");
var pathProduct = require("../data/product.json");

// var allUser = JSON.parse(fs.readFileSync("../data/user.js", "utf-8"));
// var allProducts = JSON.parse(fs.readFileSync(pathProduct, "utf-8"));

pathProduct.forEach( function (ite) {

    // console.log(ite.id);
    var product_params = {
        TableName: "Products",
        Item: {
            "id": ite.id+"",
            "name": ite.name,
            "description": ite.description,
            "guarantee": ite.guarantee,
            "type": ite.type,
            "price": ite.price
        }
    };

    docClient.put(product_params, function (err, data) {
        if (err){
            console.log(err + ite.id);
        }else
            console.log("PutItem Successed: " + ite.id);
    });
});

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
