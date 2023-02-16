const passport = require('passport');

const { createUser } = require('../../services/user.service');

exports.signUp = async function (req, res, next) {
  try {
    const userDTO = req.body;

    await createUser(userDTO);

    res.sendStatus(201);
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
