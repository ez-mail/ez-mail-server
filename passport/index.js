const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { verifyUser, findUser } = require('../services/user.service');
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
      const user = await findUser(email);

      if (!user) {
        return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_EMAIL });
      }

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
