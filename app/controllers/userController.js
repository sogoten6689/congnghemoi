var path = require('path');

var AWSConnect = require("../connectAWS/connectAWS");
var docClient = AWSConnect.docClient;

exports.getUsers = function (req, res, next) {
  if (req.session.user != null)
    if (req.session.user.type == 0) {
      var params = {
        TableName: "Users"
      }
      docClient.scan(params, function (err, data) {
        if (err) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          var users = data.Items.filter(function (item) {
            return item;
          });
          if (users.length > 0) {
            req.session.users = users;
            res.render('usersListView');
          }
          else {
            req.session.error = "User id or password wrong!";
            res.render('login');
          }
        }
      });
    }
};

exports.getUserShow = function (req, res, next) {
  if (req.session.user != null) {
    res.render('userView');
  }
  else {
    res.render('login');
  }
};

exports.postUserShow = function (req, res, next) {
  if(req.session.user != null){
    var user_type = 0; 
  }else{
    var user_type = 1; 
  }
  var user_id = req.body.user_id;
  var user_pass = req.body.user_password;
  var user_number = req.body.user_number;
  var user_email = req.body.user_email;
  var params = {
    TableName: "Users"
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      var user = data.Items.filter(function (item) {
        return item.id == user_id;
      });
      if (user.length > 0) {
        req.session.error = "Id exits!";
        res.redirect('/registere');
      }
      else {
        var user = data.Items.filter(function (item) {
          return item.number == user_number;
        });
        if (user.length > 0) {
          req.session.error = "number exits!";
          res.redirect('/registere');
        }
        else {
          var user = data.Items.filter(function (item) {
            return item.email == user_email;
          });
          if (user.length > 0) {
            req.session.error = "Email exits!";
            res.redirect('/registere');
          }
          else{
            req.session.error = 0;
            var paramsput = {
              TableName: "Users",
              Item: {
                "id": user_id+"",
                "name": "User " + user_id,
                "pass": user_pass,
                "gender": "Nam",
                "number": user_number+"",
                "email": user_email,
                "type": user_type,
                "address": "chua co"
              }
            };
            console.log("Adding a new item...");
            docClient.put(paramsput, function (err, data) {
              if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                 req.session.error = "Dang ki Loi!";
                 res.redirect('/registere');
              } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                req.session.error = "Dang ki thanh cong!";
                res.redirect('/');
              }
            });
     
          }
         
        }
      }
    }

  });
};

exports.getUserSigin = function (req, res, next) {
  res.render('userSignupView');
};