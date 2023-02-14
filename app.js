const createError = require('http-errors');
const express = require('express');

const router = require('./loaders/router');
const middleware = require('./loaders/middleware');
const initPassport = require('./passport');

const app = express();

initPassport();
middleware(app);
router(app);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json(err.message);
});

module.exports = app;
