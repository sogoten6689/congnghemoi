
var Cart = require('../models/cart');

exports.getCartList = function(req, res, next) {
    req.session.address = "cart";
    if (!req.session.cart) {
        return res.render('cartView',{totalPrice:0});
      }
      var cart = new Cart(req.session.cart);
      res.render('cartView', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice
      });
};






