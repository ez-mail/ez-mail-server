const index = require('../routes/index');
const users = require('../routes/users');

module.exports = app => {
  app.use('/', index);
  app.use('/users', users);
};
