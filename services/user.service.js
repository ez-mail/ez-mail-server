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

    const weekDate = [];
    for (let i = 0; i <= 7; i += 1) {
      const today = new Date();
      weekDate.push(new Date(today.setDate(today.getDate() - i)));
    }

    const dailyTrends = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < signInDates.length; i += 1) {
      if (signInDates[i] >= weekDate[0]) {
        dailyTrends[6] += 1;
      } else if (signInDates[i] < weekDate[0] && signInDates[i] > weekDate[1]) {
        dailyTrends[5] += 1;
      } else if (signInDates[i] < weekDate[1] && signInDates[i] > weekDate[2]) {
        dailyTrends[4] += 1;
      } else if (signInDates[i] < weekDate[2] && signInDates[i] > weekDate[3]) {
        dailyTrends[3] += 1;
      } else if (signInDates[i] < weekDate[3] && signInDates[i] > weekDate[4]) {
        dailyTrends[2] += 1;
      } else if (signInDates[i] < weekDate[4] && signInDates[i] > weekDate[5]) {
        dailyTrends[1] += 1;
      } else if (signInDates[i] < weekDate[5] && signInDates[i] > weekDate[6]) {
        dailyTrends[0] += 1;
      }
    }
    return dailyTrends;
  } catch (error) {
    next(error);
  }
};
