const mongoose = require('mongoose');

module.exports.validateId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
