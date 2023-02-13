const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema(
  {
    editingStep: {
      type: Number,
      required: true,
    },
    emailTitle: {
      type: String,
    },
    emailContent: {
      type: String,
    },
    sender: {
      type: String,
    },
    emailPreviewText: {
      type: String,
    },
    recipients: [
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
        isEmailOpen: {
          type: Boolean,
          required: true,
        },
      },
    ],
    startSendDate: {
      type: Date,
    },
    endSendDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
