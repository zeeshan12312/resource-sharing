const mongoose = require('mongoose');
const { User } = require('../models/users');
const validateUser = require('../middleware/userValidation');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.addUser = async (req, res) => {
  const { name, email, password, phone, address, city, country, companyName } =
    req.body;
  const validation = validateUser.validateAddUser(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
  let findOne = await User.findOne({ email: email });
  if (findOne) return res.status(400).send('User Already registerd');

  const user = new User({
    name,
    email,
    password,
    phone,
    address,
    city,
    country,
    companyName,
  });
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  const result = await user.save();
  const data = _.pick(result, [
    '_id',
    'name',
    'email',
    'address',
    'city',
    'country',
    'companyName',
  ]);
  return res.status(200).send(data);
};
