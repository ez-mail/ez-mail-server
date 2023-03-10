module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  saltRound: process.env.SALT_ROUND,
  cookieSecret: process.env.SECRET_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN,
  mailServerApiKey: process.env.MAIL_SERVER_API_KEY,
  mailServerOrigin: process.env.MAIL_SERVER_ORIGIN,
  serverOrigin: process.env.SERVER_ORIGIN,
};
