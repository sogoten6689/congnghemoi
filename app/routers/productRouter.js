"user strict";

router = require('express').Router();

var productController = require('../controllers/productController');


router.route('/').get(productController.getAllProduct);


router.route('/type/:id').get(productController.getProductType);

router.get('/add',productController.getViewAdd);

router.get('/delete/:id',productController.deleteProduct);

router.post('/add', productController.postAdd);

router.route('/:id').get(productController.getProduct);



module.exports = router;