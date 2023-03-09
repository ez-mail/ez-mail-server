const axios = require('axios');

const { mailServerOrigin, mailServerApiKey } = require('../config');

exports.requestSendingEmail = async function (
  emailTitle,
  emailContent,
  sender,
  recipients,
) {
  const result = await axios({
    method: 'post',
    url: `${mailServerOrigin}/users/${mailServerApiKey}/sending-email`,
    data: {
      emailTitle,
      emailContent,
      sender,
      recipients,
    },
  });

  return result;
};
