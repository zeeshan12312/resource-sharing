const mongoose = require('mongoose');
const { User } = require('../models/users');
const validateUser = require('../middleware/userValidation');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const validateObjectId = require('../helpers/idValidation');
const CONST = require('../helpers/constants.json');
const uploadFile = require('../middleware/upload');
exports.addUser = async (req, res) => {
  const {
    name,
    email,
    profileImage,
    password,
    phone,
    address,
    city,
    country,
    companyName,
  } = req.body;
  const validation = validateUser.validateAddUser(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  try {
    await uploadFile(req, res);
    // if (req.file == undefined)
    //   return res.status(400).send('Please upload a file!');
  } catch (err) {
    return res
      .status(500)
      .send(`Could not upload the file: ${req.body.file}. ${err}`);
  }

  let findOne = await User.findOne({ email: email });
  if (findOne) return res.status(400).send(CONST.USER.EMAIL_ALREADY_EXISTS);

  const user = new User({
    name,
    email,
    profileImage,
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
  if (!validateObjectId.validateId(req.params.id))
    return res.status(400).send(CONST.USER.NOT_EXIST);

  const result = await User.findById(req.params.id);
  if (!result) return res.status(404).send(CONST.USER.NOT_EXIST);

  return res.status(200).send(result);
};

exports.updateUserById = async (req, res) => {
  const { name, password, phone, address, city, country, companyName } =
    req.body;
  if (!validateObjectId.validateId(req.params.id))
    return res.status(400).send(CONST.USER.NOT_EXIST);

  const validation = validateUser.validateUpdateUser(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send(CONST.USER.NOT_EXIST);
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
