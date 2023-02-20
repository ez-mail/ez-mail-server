const express = require('express');

const { signUp, login, logout } = require('./controllers/auth.controller');
const {
  validateLogout,
  validateLogin,
} = require('./middleWares/authValidation');

const router = express.Router();

router.post('/signup', validateLogout, signUp);

router.post('/login', validateLogout, login);

router.get('/logout', validateLogin, logout);

module.exports = router;
