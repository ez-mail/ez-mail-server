const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { ERROR_MESSAGE } = require('../constants');
const { saltRound } = require('../config');

exports.createUser = async ({ email, password, userName, next }) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (user) {
      return next({ status: 400, message: ERROR_MESSAGE.EXIST_EMAIL });
    }

    const cdnCode = 'test'; // 임시코드
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword, userName, cdnCode });
  } catch (error) {
    next(error);
  }
};

exports.verifyUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_EMAIL });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return done(null, false, { message: ERROR_MESSAGE.INVALID_PASSWORD });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
