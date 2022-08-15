const mongoose = require('mongoose');
const { User } = require('../models/users');
const authValidation = require('../middleware/authValidation');
const authtoken = require('../middleware/auth');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('config');
const CONST = require('../helpers/constants.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

exports.login = async (req, res) => {
  const validation = authValidation.loginValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(CONST.USER.LOGIN_ERROR);

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) return res.status(400).send(CONST.USER.LOGIN_ERROR);
  const token = authtoken.getjsontoken(user);

  return res.header('x-auth-token', token).status(200).send({ token: token });
};

exports.forgetPassword = async (req, res) => {
  const validation = authValidation.forgetPasswordValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(CONST.USER.NOT_FOUND_EMAIL);

  const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASS,
    },
  });
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        partialsDir: path.resolve('./forget-password/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./helpers/'),
    })
  );
  const token = authtoken.getjsontoken(user);
  const mailConfigurations = {
    from: config.SENDER_EMAIL,
    to: req.body.email,
    subject: CONST.USER.FORGET_EMAIL_SUBJECT,
    template: 'forget-password',
    context: {
      URL: `${config.assetsBaseUrl}/auth/${token}`,
    },
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
};
