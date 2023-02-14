const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { cookieSecret } = require('../config');

module.exports = app => {
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: cookieSecret,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'session-cookie',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
