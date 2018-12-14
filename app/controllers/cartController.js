
var AWSConnect = require("../connectAWS/connectAWS");
var docClient = AWSConnect.docClient;
var Cart = require('../models/cart');

exports.getCartList = function (req, res, next) {
    req.session.address = "cart";
    if (!req.session.cart) {
        return res.render('cartView', { totalPrice: 0 });
    }
    var cart = new Cart(req.session.cart);
    res.render('cartView', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
};


exports.getCartListDB = function (req, res, next) {
    var listCart = [];
    var cart_params = {
        TableName: "Carts"
    };
    docClient.scan(cart_params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // data.Items.forEach(function (item) {
            //     // listCart.push(item);
            // });
            req.session.listcartshow = data.Items;
            res.render('cartShowBuy');

        }

    });
    // console.log(listCart);
    // req.session.listcartshow = listCart;

    // res.render('cartShowBuy');
};





