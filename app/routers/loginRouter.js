"user strict";

router = require('express').Router();

var loginController = require('../controllers/loginController');
  
router.route('/')
    .get(function (req, res) {
        res.render('login');
    })
    .post(loginController.checkLogin);
module.exports = router;