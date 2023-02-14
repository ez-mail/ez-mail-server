const index = require('../routes/index');

module.exports = app => {
  app.use('/', index);
};
