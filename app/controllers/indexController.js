var fs = require('fs');
var path = require('path');
var Cart = require('../models/cart');
var normalPath = path.normalize(__dirname + '../../data/product.json');
var helper = require("../helpers/helper")


// var products = JSON.parse(fs.readFileSync(normalPath, 'utf8'));
var accUsers = require("../data/user");
var Cart = require('../models/cart');
var user_current = "";

var AWSConnect = require("../connectAWS/connectAWS");
var docClient = AWSConnect.docClient;
var products;
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

exports.homeGET = function (req, res, next) {
    if (user_current != "") {
        req.session.user = user_current;
    }

    req.session.address = "home";
    req.session.title = "Watch shopping";
    if(req.session.products ==null)
        req.session.products = products;
    res.render('index');
};

exports.homeADD = function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function (item) {
        return item.id == productId;
    });
    cart.add(product[0], productId);
    req.session.cart = cart;
    if (req.session.address == "cart") {
        return res.redirect('/carts');
    }
    res.redirect('/');
};

exports.homeManager = function (req, res, next) {
    if(req.session.user != null){
        if(req.session.user.type ==0){
            res.render('managerView');
        }
    }
};

exports.homeREMOVE = function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/carts');
};

exports.homeErr = function (req, res) {
    res.redirect('/');
};

exports.homeLogin = function (req, res, next) {
    if (!req.session.error) {
        req.session.error = 0;
    }
    res.render('login');
}

exports.homeLogout = function (req, res, next) {
    req.session.user = null;
    res.render('login');
}
exports.homeNhanh = function (req, res, next) {
    var product_params = {
        TableName: "Users"
    };
    docClient.scan(product_params, function(err, data){
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }else{
             accUsers = data.Items.filter(function (item) {
                return item.id=="lamnn";
            });
            req.session.user = accUsers[0];
            res.redirect('/');

        }
        
    });
}

exports.homeSave = function (req, res, next) {
    if (req.session.user == null) {
        res.render('login');
    }
    else {
        user_current = req.session.user;
        var cart = new Cart(req.session.cart);
        var listItemsCart =cart.getItems();
        var cartlistProduct =[]
        listItemsCart.forEach(function(x){
            var valueItem = [x.item.name, x.quantity, x.price];
            cartlistProduct.push(valueItem);
        });

        var params = {
            TableName: "Carts",
            Item: {
                no: helper.genrenateID(),
                name: req.session.user.id,
                number: req.session.user.number,
                type: 0,
                totalItems: req.session.cart.totalItems,
                listItems: cartlistProduct,
                totalPrice: req.session.cart.totalPrice
            }
        };
        docClient.put(params, function(err, data){
            if (err) {
                console.log("loi");
                console.error("Unable to put the table. Error JSON:", JSON.stringify(err, null, 2));
            }else{
                console.log("ok");
            }
            
        });
        req.session.err = null;
        req.session.cart = null;
        req.session.user = user_current;

        res.redirect('/');  
    }

}

exports.postLogin = function (req, res, next) {
   
    var user_id = req.body.id;
    var user_pass = req.body.password;
    var params = {
        TableName: "Users"
    };
    docClient.scan(params, function(err, data){
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }else{
            var user = data.Items.filter(function (item) {
                return item.id == user_id && item.pass == user_pass;
            });
            if (user.length > 0) {
                req.session.error = 0;
                req.session.user = user[0];
                res.redirect('/');
            }
            else {
                req.session.error = "User id or password wrong!";
                res.render('login');
            }
        }
        
    });

    
}

exports.homeShowUser = function (req, res) {
    var data = req.body;
    res.render('userView',
        { user: data.user, products: products, cart: cart }
    );
};
