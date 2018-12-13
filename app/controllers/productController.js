var fs = require('fs');
var path = require('path');
var normalPath = path.normalize( __dirname + '../../data/product.json');

var products = JSON.parse(fs.readFileSync(normalPath, 'utf8'));


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