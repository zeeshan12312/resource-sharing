const userController = require('../controllers/usersController');
const express = require('express');

const router = express.Router();

router.post('/user', userController.addUser);

module.exports = router;
