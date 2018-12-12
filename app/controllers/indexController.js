var fs = require('fs');
var path = require('path');
var Cart = require('../models/cart');
var normalPath = path.normalize(__dirname + '../../data/product.json');

var products = JSON.parse(fs.readFileSync(normalPath, 'utf8'));
var accUsers = require("../data/user");
var Cart = require('../models/cart');
var user_current = "";

var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;



exports.homeGET = function (req, res, next) {
    if (user_current != "") {
        req.session.user = user_current;
    }

    req.session.address = "home";
    req.session.title = "Watch shopping2";
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
    req.session.user = accUsers[0];
    res.redirect('/');
}

exports.homeSave = function (req, res, next) {
    if (req.session.user == null) {
        res.render('login');
    }
    else {
        user_current = req.session.user;
        var textData = JSON.stringify(req.session.cart);
        fs.appendFile('../bao_cao_visual/app/data/textData.json',textData, function (err) {
            if (err) {
                throw err;
            }
            req.session.err = null;
            
            req.session.user = user_current;

            res.redirect('/');  
        });

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
                console.log(item);
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
        { user: data.user, title: "Watch shopping", products: products, cart: cart }
    );
};
