const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema(
  {
    editingStep: {
      type: String,
      default: '01',
    },
    emailTitle: {
      type: String,
      default: '제목없음',
    },
    emailContent: {
      type: String,
      default: '',
    },
    sender: {
      type: String,
      required: true,
    },
    emailPreviewText: {
      type: String,
      default: '',
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
    totalSendCount: {
      type: Number,
    },
    successSendCount: {
      type: Number,
    },
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
