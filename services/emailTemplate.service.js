const EmailTemplate = require('../models/EmailTemplate');

exports.createNewEmailTemplate = async function (userName) {
  const newEmailTemplate = {
    sender: userName,
  };

  const result = await EmailTemplate.create(newEmailTemplate);

  return result;
};

exports.getEmailTemplateByEmailId = async function (emailId) {
  const emailTemplate = await EmailTemplate.findById(emailId).exec();

  return emailTemplate;
};
