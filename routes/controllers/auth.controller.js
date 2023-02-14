const passport = require('passport');
const { createUser } = require('../../services/auth.service');

exports.signUp = async function (req, res, next) {
  try {
    const userDTO = req.body;
    await createUser(userDTO, next);

    res.status(201).json('회원가입 완료');
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
