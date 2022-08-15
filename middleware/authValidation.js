const Joi = require('joi');
exports.loginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });
  return schema.validate(data);
};

exports.forgetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });
  return schema.validate(data);
};
