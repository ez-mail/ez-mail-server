const passport = require('passport');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const { createUser, findUserByEmail } = require('../../services/user.service');
const { ERROR_MESSAGE } = require('../../constants');
const { saltRound } = require('../../config');

exports.signUp = async function (req, res, next) {
  try {
    const { email, password, userName } = req.body;

    const targetUser = await findUserByEmail(email);

    if (targetUser) {
      return next(createError(400, ERROR_MESSAGE.EXIST_EMAIL));
    }

    const cdnCode = 'test'; // 임시코드
    const salt = await bcrypt.genSalt(Number(saltRound));
    const hashedPassword = await bcrypt.hash(password, salt);

    await createUser(email, hashedPassword, userName, cdnCode);

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
