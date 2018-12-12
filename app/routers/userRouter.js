"user strict";

router = require('express').Router();

var userController = require('../controllers/userController')

router.get('/', userController.getUsers);
router.get('/add', userController.getUserSigin);
router.post('/add', userController.getUserShow);
router.get('/:id', userController.getUserShow);

module.exports = router;