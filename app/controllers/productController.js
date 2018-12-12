var fs = require('fs');
var path = require('path');
var normalPath = path.normalize( __dirname + '../../data/product.json');

var products = JSON.parse(fs.readFileSync(normalPath, 'utf8'));

exports.getProduct = function(req, res, next) {
    var productId = req.params.id;
    var product = products.filter(function(item){
        return item.id == productId ;
    });
      res.render('showProduct', {
        title:"Watch shopping",
        product: product[0]
      });
};