"user strict";

router = require('express').Router();
var indexController = require('../controllers/indexController')

router.get('/', indexController.homeGET);

router.post('/add/:id', indexController.homeADD);

router.get('/add/:id', indexController.homeADD);

router.get('/manager', indexController.homeManager);

router.get('/remove/:id', indexController.homeREMOVE);

router.post('/login', indexController.postLogin);

router.get('/login', indexController.homeLogin);

router.get('/logout', indexController.homeLogout);

router.get('/nhanh', indexController.homeNhanh);

router.get('/save', indexController.homeSave);

router.get('/user', indexController.homeShowUser);

module.exports = router;