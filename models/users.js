const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    phone: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    address: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    city: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    country: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    companyName: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

module.exports.User = User;
