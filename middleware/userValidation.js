const Joi = require('joi');

module.exports.validateAddUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    password: Joi.string().min(6).required(),
    phone: Joi.number().min(4).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    companyName: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.validateUpdateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().min(4).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    companyName: Joi.string().required(),
  });
  return schema.validate(data);
};
