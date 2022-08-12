const mongoose = require('mongoose');
const { User } = require('../models/users');
const validateUser = require('../middleware/userValidation');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { reset } = require('nodemon');

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
exports.userslist = async (req, res) => {
  const result = await User.find();
  return res.status(200).send(result);
};
exports.getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send('Invalid ID Provided');

  const result = await User.findById(req.params.id);
  return res.status(200).send(result);
};

exports.updateUserById = async (req, res) => {
  const { name, password, phone, address, city, country, companyName } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send('Invalid ID Provided');

  const validation = validateUser.validateUpdateUser(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User Not Fuund');
  user.name = name ? name : user.name;
  user.password = password ? password : user.password;
  user.phone = phone ? phone : user.phone;
  user.address = address ? address : user.address;
  user.city = city ? city : user.city;
  user.country = country ? country : user.country;
  user.companyName = companyName ? companyName : companyName.name;

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
