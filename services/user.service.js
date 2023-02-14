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
