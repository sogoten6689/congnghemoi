var fs = require('fs');
var path = require('path');
// var normalPath = path.normalize( __dirname + '../../data/product.json');

// var products = JSON.parse(fs.readFileSync(normalPath, 'utf8'));

var AWSConnect = require("../connectAWS/connectAWS");
var docClient = AWSConnect.docClient;
var product_params = {
  TableName: "Products"
};
var products;
docClient.scan(product_params, function(err, data){
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    }else{
         products = data.Items.filter(function (item) {
            return item;
        });
    }
    
});

exports.getAllProduct = function(req, res, next) {
    req.session.products = products;
    res.render('productsListView');
};

exports.getProduct = function(req, res, next) {
  var productId = req.params.id;
  var product = products.filter(function(item){
      return item.id == productId ;
  });
    res.render('showProduct', {
      product: product[0]
    });
};

exports.getProductType = function(req, res, next) {
    var product_type = req.params.id;
    if(product_type != "0"){
      var product = products.filter(function(item){
        return item.type == parseInt(product_type) ;
    });
         req.session.products = product;
      res.redirect('/');  
    }
      req.session.products = products;
      res.redirect('/');  
};

exports.getViewAdd = function(req, res, next) {
  res.render('addProductView');
};

exports.postAdd = function(req, res, next) {
    // console.log(req.body);
    var product_params = {
        TableName: "Products",
        Item: {
            "id": "5",
            "name": req.body.product_name,
            "description": req.body.product_description,
            "guarantee": 6,
            "type": 1,
            "price": req.body.product_price
        }
    };
    docClient.put(product_params, function (err, data) {
        if (err){
            console.log(err);
        }else
            console.log("PutItem Successed!");
    });
    var product_params = {
        TableName: "Products"
    };
    docClient.scan(product_params, function(err, data){
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }else{
             products = data.Items.filter(function (item) {
                return item;
            });
        }
        
    });
    res.redirect('/');  
  };
  exports.deleteProduct =function(req, res, next) {
      var product_delete = products.filter(function(item){
          return item.name == req.params.id;
      })
      var product_params = {
        TableName: "Products",
        Key: {
            "id": product_delete[0].id,
            "name": product_delete[0].name
        }
    };
    docClient.delete(product_params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
    var product_params = {
        TableName: "Products"
    };
    docClient.scan(product_params, function(err, data){
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }else{
             products = data.Items.filter(function (item) {
                return item;
            });
        }
        
    });
    res.redirect('/');  
  }