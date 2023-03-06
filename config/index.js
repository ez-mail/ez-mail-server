module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  saltRound: process.env.SALT_ROUND,
  cookieSecret: process.env.SECRET_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN,
  smtpId: process.env.SMTP_ID,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpPort: process.env.SMTP_PORT,
  smtpHost: process.env.SMTP_HOST,
  smtpDomain: process.env.SMTP_DOMAIN,
};
