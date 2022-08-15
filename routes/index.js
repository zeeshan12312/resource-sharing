const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
module.exports = [].concat(userRoute, authRoute);
