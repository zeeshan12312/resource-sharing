const mongoose = require('mongoose');
const { User } = require('../models/users');
const validateUser = require('../middleware/userValidation');

exports.addUser = (req, res) => {
  const body = req.body;
  const validation = validateUser.validateAddUser(body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    return res.status(200).send('data added successfully');
  }
};
