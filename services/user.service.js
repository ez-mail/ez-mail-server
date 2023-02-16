const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { saltRound } = require('../config');
const { INVALID_USER_ID, ERROR_MESSAGE } = require('../constants');

exports.createUser = async ({ email, password, userName }) => {
  const targetUser = await User.findOne({ email }).lean();

  if (targetUser) {
    throw createError(400, ERROR_MESSAGE.EXIST_EMAIL);
  }

  const cdnCode = 'test'; // 임시코드

  const salt = await bcrypt.genSalt(Number(saltRound));
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.create({ email, password: hashedPassword, userName, cdnCode });
};

exports.verifyUser = async (email, password, done) => {
  try {
    const targetUser = await User.findOne({ email }).lean();

    if (!targetUser) {
      return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_EMAIL });
    }

    const isMatched = await bcrypt.compare(password, targetUser.password);

    if (!isMatched) {
      return done(null, false, { message: ERROR_MESSAGE.INVALID_PASSWORD });
    }

    return done(null, targetUser);
  } catch (error) {
    return done(error);
  }
};

exports.getTargetUser = async function (userId) {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError(400, INVALID_USER_ID);
  }

  const targetUser = await User.findById(userId).lean();

  return targetUser;
};

exports.getSubscribersTrend = async function (userId) {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError(400, INVALID_USER_ID);
  }

  const targetUser = await User.findById(userId).lean();

  const signInDates = [];
  const weekDates = [];

  targetUser.subscribers.forEach(value => {
    signInDates.push(value.createdAt);
  });

  for (let i = 0; i <= 7; i += 1) {
    const today = new Date();

    weekDates.push(new Date(today.setDate(today.getDate() - i)));
  }

  const dailyTrends = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < signInDates.length; i += 1) {
    if (signInDates[i] >= weekDates[0]) {
      dailyTrends[6] += 1;
    } else if (signInDates[i] < weekDates[0] && signInDates[i] > weekDates[1]) {
      dailyTrends[5] += 1;
    } else if (signInDates[i] < weekDates[1] && signInDates[i] > weekDates[2]) {
      dailyTrends[4] += 1;
    } else if (signInDates[i] < weekDates[2] && signInDates[i] > weekDates[3]) {
      dailyTrends[3] += 1;
    } else if (signInDates[i] < weekDates[3] && signInDates[i] > weekDates[4]) {
      dailyTrends[2] += 1;
    } else if (signInDates[i] < weekDates[4] && signInDates[i] > weekDates[5]) {
      dailyTrends[1] += 1;
    } else if (signInDates[i] < weekDates[5] && signInDates[i] > weekDates[6]) {
      dailyTrends[0] += 1;
    }
  }
  return dailyTrends;
};

exports.getUserName = async function (userId) {
  const { userName } = await User.findById(userId).lean();

  return userName;
};

exports.getSubscribersList = async function (userId) {
  const { subscribers } = await User.findById(userId).lean();

  return subscribers;
};

exports.addNewSubscribers = async function (userId, newSubscribersArray) {
  const targetUser = await User.findById(userId).exec();

  targetUser.subscribers.push(...newSubscribersArray);

  await targetUser.save();
};

exports.addEmailIdToUser = async function (userId, emailId) {
  const targetUser = await User.findById(userId).exec();

  targetUser.emailTemplates.push(mongoose.Types.ObjectId(emailId));

  await targetUser.save();
};
