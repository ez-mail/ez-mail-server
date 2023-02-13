const createError = require('http-errors');
const express = require('express');

const path = require('path');
const router = require('./loaders/router');
const middleware = require('./loaders/middleware');

const app = express();

middleware(app);
router(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
