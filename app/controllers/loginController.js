var data = require("../data/user");
var login = {
    checkLogin : function(req,res){
        var id = req.body.id;
        var pass = req.body.pass;
        for (var i in data) {
            if(data[i].id == id){
                if(data[i].pass == pass){
                    res.send("successful!")
                    return true;
                }else{
                    res.send("faill pass")
                    return false;
                }
            }
          } 
          res.send("faill id")
          return false;
    }
};

module.exports = login;
