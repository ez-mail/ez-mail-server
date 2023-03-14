const cors = require('cors');
const auth = require('../routes/auth');
const { validateLogin } = require('../routes/middleWares/authValidation');
const users = require('../routes/users');
const {
  addValidExternalSubscriber,
} = require('../routes/controllers/subscriber.controller');
const { clientOrigin } = require('../config');

module.exports = app => {
  app.options('/users/:access_token/external-subscriber', cors());
  app.post(
    '/users/:access_token/external-subscriber',
    addValidExternalSubscriber,
  );
  app.use(
    cors({
      origin: clientOrigin,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );
  app.use('/', auth);
  app.use('/users', validateLogin, users);
};
