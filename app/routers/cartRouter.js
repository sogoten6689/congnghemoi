"user strict";

router = require('express').Router();

var cartController = require('../controllers/cartController')

router.get('/', cartController.getCartList);

router.get('/show', cartController.getCartListDB);

module.exports = router;