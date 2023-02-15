const mongoose = require('mongoose');

const EmailTemplate = require('../models/EmailTemplate');
const User = require('../models/User');
const { INVALID_USER_ID } = require('../constants');

exports.getLastSentEmailTemplate = async (userId, next) => {
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return next({ status: 400, message: INVALID_USER_ID });
    }

    const user = await User.findById(userId).lean();
    const emailTemplates = await EmailTemplate.find({
      _id: { $in: user.emailTemplates },
    });
    const lastSentEmailTemplate =
      emailTemplates.length > 0
        ? emailTemplates.reduce((prev, current) => {
            return prev.endSendDate >= current.endSendDate ? prev : current;
          })
        : null;

    return lastSentEmailTemplate;
  } catch (error) {
    next(error);
  }
};

exports.getEmailTemplates = async (userId, next) => {
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return next({ status: 400, message: INVALID_USER_ID });
    }

    const user = await User.findById(userId).lean();
    const emailTemplates = await EmailTemplate.find({
      _id: { $in: user.emailTemplates },
    });

    return emailTemplates;
  } catch (error) {
    next(error);
  }
};

exports.getSubscribersTrend = async (userId, next) => {
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return next({ status: 400, message: INVALID_USER_ID });
    }
    const user = await User.findById(userId).lean();
    const signInDates = [];
    user.subscribers.forEach(value => {
      signInDates.push(value.createdAt);
    });

    const weekDates = [];
    for (let i = 0; i <= 7; i += 1) {
      const today = new Date();
      weekDates.push(new Date(today.setDate(today.getDate() - i)));
    }

    const dailyTrends = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < signInDates.length; i += 1) {
      if (signInDates[i] >= weekDates[0]) {
        dailyTrends[6] += 1;
      } else if (
        signInDates[i] < weekDates[0] &&
        signInDates[i] > weekDates[1]
      ) {
        dailyTrends[5] += 1;
      } else if (
        signInDates[i] < weekDates[1] &&
        signInDates[i] > weekDates[2]
      ) {
        dailyTrends[4] += 1;
      } else if (
        signInDates[i] < weekDates[2] &&
        signInDates[i] > weekDates[3]
      ) {
        dailyTrends[3] += 1;
      } else if (
        signInDates[i] < weekDates[3] &&
        signInDates[i] > weekDates[4]
      ) {
        dailyTrends[2] += 1;
      } else if (
        signInDates[i] < weekDates[4] &&
        signInDates[i] > weekDates[5]
      ) {
        dailyTrends[1] += 1;
      } else if (
        signInDates[i] < weekDates[5] &&
        signInDates[i] > weekDates[6]
      ) {
        dailyTrends[0] += 1;
      }
    }
    return dailyTrends;
  } catch (error) {
    next(error);
  }
};
