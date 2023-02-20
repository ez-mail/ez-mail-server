const auth = require('../routes/auth');
const { validateLogin } = require('../routes/middleWares/authValidation');
const users = require('../routes/users');

module.exports = app => {
  app.use('/', auth);
  app.use('/users', validateLogin, users);
};
