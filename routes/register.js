const express = require('express');

const router = express.Router();

const registerController = require('../controllers/register_controller');

router.get('/', registerController.register);
router.post('/', registerController.newUser);
module.exports = router;