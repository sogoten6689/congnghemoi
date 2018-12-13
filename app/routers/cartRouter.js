"user strict";

router = require('express').Router();

var cartController = require('../controllers/cartController')

router.get('/', cartController.getCartList);


module.exports = router;