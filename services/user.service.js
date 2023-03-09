const mongoose = require('mongoose');
const createError = require('http-errors');
const moment = require('moment');

const User = require('../models/User');
const { ERROR_MESSAGE } = require('../constants');

exports.createUser = async function (
  email,
  password,
  userName,
  cdnCode,
  accessToken,
) {
  await User.create({ email, password, userName, cdnCode, accessToken });
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

  targetUser.subscribers.forEach(value => {
    if (value) {
      signInDates.push(moment(value.createdAt).format());
    }
  });

  const dailyTrends = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < signInDates.length; i += 1) {
    if (signInDates[i] < moment().startOf('day').add(-5, 'days').format()) {
      dailyTrends[0] += 1;
    }

    if (signInDates[i] < moment().startOf('day').add(-4, 'days').format()) {
      dailyTrends[1] += 1;
    }

    if (signInDates[i] < moment().startOf('day').add(-3, 'days').format()) {
      dailyTrends[2] += 1;
    }

    if (signInDates[i] < moment().startOf('day').add(-2, 'days').format()) {
      dailyTrends[3] += 1;
    }

    if (signInDates[i] < moment().startOf('day').add(-1, 'days').format()) {
      dailyTrends[4] += 1;
    }

    if (signInDates[i] < moment().startOf('day').format()) {
      dailyTrends[5] += 1;
    }

    if (signInDates[i] < moment().format()) {
      dailyTrends[6] += 1;
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

exports.addValidExternalSubscriber = async function (
  accessToken,
  newSubscriber,
) {
  const targetUser = await User.findOne({ accessToken }).exec();

  if (!targetUser) {
    return false;
  }

  targetUser.subscribers.push(newSubscriber);

  await targetUser.save();

  return true;
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
