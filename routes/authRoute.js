const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/auth', authController.login);
router.post('/auth/forget-password', authController.forgetPassword);

module.exports = router;
