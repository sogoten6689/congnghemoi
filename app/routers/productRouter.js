"user strict";

router = require('express').Router();
var productController = require('../controllers/productController');

router.route('/:id').get(productController.getProduct);




module.exports = router;