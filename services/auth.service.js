const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { ERROR_MESSAGE } = require('../constants');

exports.createUser = async ({ email, password, userName, next }) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (user) {
      return next({ message: ERROR_MESSAGE.EXIST_EMAIL });
    }

    const cdnCode = 'test'; // 임시코드
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword, userName, cdnCode });
  } catch (error) {
    next(error);
  }
};
