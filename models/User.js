const mongoose = require('mongoose');
const ERROR_MESSAGES = require('../constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [5, ERROR_MESSAGES.RESTRICTED_MIN_EMAIL_LENGTH],
      maxLength: [30, ERROR_MESSAGES.RESTRICTED_MAX_EMAIL_LENGTH],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, ERROR_MESSAGES.RESTRICTED_MAX_EMAIL_LENGTH],
    },
    userName: {
      type: String,
      required: true,
    },
    cdnCode: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    subscribers: [
      {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        adAgreement: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    emailTemplates: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
