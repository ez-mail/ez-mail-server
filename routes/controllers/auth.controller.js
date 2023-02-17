const passport = require('passport');
const createError = require('http-errors');

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
  passport.authenticate('local', (serverError, user, info) => {
    if (serverError) {
      return next(serverError);
    }

    if (!user) {
      return next(createError(400, info.message));
    }

    res.json({ userId: String(user._id) });
  })(req, res, next);
};
