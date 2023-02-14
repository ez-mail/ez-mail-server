// const passport = require('passport');
const { createUser } = require('../../services/auth.service');

exports.signUp = async function (req, res, next) {
  try {
    const userDTO = req.body;
    await createUser(userDTO, next);

    res.json('회원가입 완료');
  } catch (error) {
    next(error);
  }
};

exports.login = async function (req, res, next) {
  try {
    res.json('로그인 완료');
  } catch (error) {
    next(error);
  }
};
