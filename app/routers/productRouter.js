"user strict";

router = require('express').Router();

var productController = require('../controllers/productController');


router.route('/').get(productController.getAllProduct);


router.route('/type/:id').get(productController.getProductType);

router.route('/:id').get(productController.getProduct);



module.exports = router;