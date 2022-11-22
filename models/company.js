const mongoose = require('mongoose');
const Joi = require('joi');

const companySchema = new mongoose.Schema(
  {
    companyName: {
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
    logo: {
      type: String,
      required: true,
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
    isDeleted: {
      type: String,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model('Company', companySchema);

module.exports.Company = Company;
