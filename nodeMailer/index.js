const nodemailer = require('nodemailer');
const { naverPort, naverId, naverPassword } = require('../config');

exports.sendMail = async function ({
  emailTitle,
  emailContent,
  sender,
  recipientsAddress,
}) {
  const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: naverPort,
    secure: naverPort === 465,
    auth: {
      user: naverId,
      pass: naverPassword,
    },
  });

  const info = await transporter.sendMail({
    from: `${sender} <${naverId}@naver.com>`,
    to: recipientsAddress,
    subject: emailTitle,
    html: emailContent,
  });

  return info;
};
