const auth = require('../routes/auth');
const { validateLogin } = require('../routes/middleWares/authValidation');
const users = require('../routes/users');
const {
  addValidExternalSubscriber,
} = require('../routes/controllers/subscriber.controller');

module.exports = app => {
  app.use('/', auth);
  app.post(
    '/users/:access_token/external-subscriber',
    addValidExternalSubscriber,
  );
  app.use('/users', validateLogin, users);
};
