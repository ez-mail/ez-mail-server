const EmailTemplate = require('../models/EmailTemplate');

exports.createNewEmailTemplate = async function (userName) {
  const newEmailTemplate = {
    sender: userName,
  };

  const result = await EmailTemplate.create(newEmailTemplate);

  return result;
};
