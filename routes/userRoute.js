const userController = require('../controllers/usersController');
const express = require('express');

const router = express.Router();

router.post('/user', userController.addUser);
router.get('/user', userController.userslist);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);

module.exports = router;
