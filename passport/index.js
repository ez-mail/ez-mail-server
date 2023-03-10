const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { findUserByEmail } = require('../services/user.service');
const { ERROR_MESSAGE } = require('../constants');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const targetUser = await findUserByEmail(email);

        if (!targetUser) {
          return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_USER });
        }

        const isMatched = await bcrypt.compare(password, targetUser.password);

        if (!isMatched) {
          return done(null, false, { message: ERROR_MESSAGE.INVALID_PASSWORD });
        }

        done(null, targetUser);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const targetUser = await findUserByEmail(email);

      if (!targetUser) {
        return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_USER });
      }

      done(null, targetUser);
    } catch (err) {
      done(err);
    }
  });
};
