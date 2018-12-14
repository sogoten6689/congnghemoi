var data = require("../data/user");

var AWSConnect = require("../connectAWS/connectAWS");
var docClient = AWSConnect.docClient;
var login = {
    checkLogin : function(req,res){
        var id = req.body.id;
        var pass = req.body.pass;
        var params = {
            TableName: "Users"
        };
        docClient.scan(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            }else{
                var user = data.Items.filter(function (item) {
                    return item.id == id && item.pass == pass;
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
};

module.exports = login;
