const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const { cookieSecret, clientOrigin } = require('../config');

module.exports = app => {
  app.use(
    cors({
      origin: [clientOrigin, 'http://127.0.0.1:5500'],
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(cookieSecret));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: cookieSecret,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'sessionId',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
