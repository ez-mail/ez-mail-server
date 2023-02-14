const express = require('express');
const { signUp, login } = require('./controllers/auth.controller');

const router = express.Router();

router.get('/', function (req, res) {
  res.json('hello!');
});

router.post('/signup', signUp);

router.post('/login', login);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
