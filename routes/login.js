const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login_controller');

router.get('/', loginController.login);
router.post('/', loginController.newLogin);
module.exports = router;