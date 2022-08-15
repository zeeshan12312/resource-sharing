const jwt = require('jsonwebtoken');

module.exports.getjsontoken = (data) => {
  const token = jwt.sign(
    {
      _id: data.id,
      email: data.email,
      name: data.name,
    },
    '123456',
    { expiresIn: '1000m' }
  );
  return token;
};
