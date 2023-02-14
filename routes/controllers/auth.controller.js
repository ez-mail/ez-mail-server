const passport = require('passport');

const { createUser } = require('../../services/auth.service');

exports.signUp = async function (req, res, next) {
  try {
    const userDTO = req.body;
    await createUser(userDTO, next);

    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

exports.login = async function (req, res, next) {
  try {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};
