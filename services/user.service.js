const mongoose = require('mongoose');
const createError = require('http-errors');

const User = require('../models/User');
const { ERROR_MESSAGE } = require('../constants');

exports.createUser = async function (email, password, userName, cdnCode) {
  await User.create({ email, password, userName, cdnCode });
};

exports.findUserByEmail = async function (email) {
  const targetUser = await User.findOne({ email }).lean();

  return targetUser;
};

exports.findUserByUserId = async function (userId) {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError(400, ERROR_MESSAGE.INVALID_USER_ID);
  }

  const targetUser = await User.findById(userId).lean();

  return targetUser;
};

exports.getSubscribersTrend = async function (userId) {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError(400, ERROR_MESSAGE.INVALID_USER_ID);
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

exports.addNewSubscribers = async function (userId, newSubscribers) {
  const targetUser = await User.findById(userId).exec();

  targetUser.subscribers.push(...newSubscribers);

  await targetUser.save();
};

exports.deleteSubscribers = async function (userId, subscribers) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: { subscribers: { _id: { $in: subscribers } } },
    },
  );
};

exports.addEmailIdToUser = async function (userId, emailId) {
  const targetUser = await User.findById(userId).exec();

  targetUser.emailTemplates.push(mongoose.Types.ObjectId(emailId));

  await targetUser.save();
};

exports.getUserSendingInfo = async function (userId) {
  const { userName, companyName, address, contact, cdnCode } =
    await User.findById(userId).lean();

  return { userName, companyName, address, contact, cdnCode };
};

exports.updateUserSendingInfo = async function (userId, update) {
  await User.findByIdAndUpdate(userId, update);
};

exports.updateEmailIdToUser = async function (userId, emailId) {
  await User.updateOne({ _id: userId }, { $pull: { emailTemplates: emailId } });
};
