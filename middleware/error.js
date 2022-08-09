module.exports.get500 = function (err, req, res, next) {
  console.log('error:', err.message);
  res.status(500).send(`Server Internal Error:${err.message}`);
};
module.exports.get404 = (req, res, next) => {
  res.status(404).send('Route not found');
};
