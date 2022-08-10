const mongoose = require('mongoose');

module.exports = async function () {
  mongoose
    .connect('mongodb://localhost:27017/resource-sharing', {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(`DataBase Connection Successfully:`);
    })
    .catch((err) => {
      console.log(`DataBase Connection Error:`, err.message);
    });
};
