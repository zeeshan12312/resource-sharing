const userController = require('../controllers/usersController');
const express = require('express');

const router = express.Router();
const upload = require('multer')();

router.post('/user', upload.any(), userController.addUser);
router.get('/user', userController.userslist);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);

module.exports = router;
