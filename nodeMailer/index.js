const nodemailer = require('nodemailer');
const { smtpPort, smtpId, smtpPassword, smtpHost } = require('../config');

exports.sendMail = async function ({
  emailTitle,
  emailContent,
  sender,
  recipientsAddress,
  userName,
}) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === '465',
    auth: {
      user: smtpId,
      pass: smtpPassword,
    },
  });

  const info = await transporter.sendMail({
    from: `${sender || userName} <${smtpId}@naver.com>`,
    to: recipientsAddress,
    subject: emailTitle,
    html: emailContent,
  });

  return info;
};
