const EmailTemplate = require('../models/EmailTemplate');

exports.createNewEmailTemplate = async function (userName) {
  const newEmailTemplate = {
    sender: userName,
  };

  const result = await EmailTemplate.create(newEmailTemplate);

  return result;
};

exports.getEmailTemplate = async function (emailId) {
  const emailTemplate = await EmailTemplate.findById(emailId).lean();

  return emailTemplate;
};

exports.getLastSentEmailTemplate = async function (targetUser) {
  const emailTemplates = await EmailTemplate.find({
    _id: { $in: targetUser.emailTemplates },
  }).lean();

  const lastSentEmailTemplate =
    emailTemplates.length > 0
      ? emailTemplates.reduce((prev, current) => {
          return prev.endSendDate >= current.endSendDate ? prev : current;
        })
      : null;

  return lastSentEmailTemplate;
};

exports.getEmailTemplates = async function (targetUser) {
  const emailTemplates = await EmailTemplate.find({
    _id: { $in: targetUser.emailTemplates },
  }).lean();

  return emailTemplates;
};

exports.updateEmailTemplate = async function (emailId, update) {
  await EmailTemplate.findByIdAndUpdate(emailId, update);
};
