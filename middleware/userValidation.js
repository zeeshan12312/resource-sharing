const Joi = require('joi');

module.exports.validateAddUser = (data) => {
  console.log('body ', data);
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
