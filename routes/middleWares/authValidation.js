const createError = require('http-errors');

const { ERROR_MESSAGE } = require('../../constants');

exports.validateLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next(createError(401, ERROR_MESSAGE.NEED_LOGIN));
  }

  next();
};

exports.validateLogout = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next(createError(403, ERROR_MESSAGE.NEED_LOGOUT));
  }

  next();
};
