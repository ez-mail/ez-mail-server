const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const { verifyUser } = require('../services/user.service');
const { ERROR_MESSAGE } = require('../constants');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        verifyUser(email, password, done);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.find({ email }).lean();
      if (!user) {
        return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_EMAIL });
      }

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
