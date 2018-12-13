var path = require('path');

var AWSConnect = require("../connectAWS/connectAWS.js");
var docClient = AWSConnect.docClient;

exports.getUsers = function(req, res, next) {
    if(req.session.user != null)
      if(req.session.user.type == 0){
        var params = {
          TableName: "Users"
      }
      docClient.scan(params, function(err, data){
          if (err) {
              console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          }else{
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

exports.getUserShow = function(req, res, next) {
  if(req.session.user != null){
    res.render('userView');
  }
  else{
    res.render('login');
  }
};

exports.getUserSigin = function(req, res, next) {
  if(req.session.user != null){
    res.render('userSignupView');
  }
  else{
    res.render('login');
  }
};