const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log("router loaded");
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/login', require('./login'));
module.exports = router;//here we can't write only exports, module is neccessary