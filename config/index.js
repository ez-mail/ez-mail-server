module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  saltRound: process.env.SALT_ROUND,
  cookieSecret: process.env.SECRET_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN,
};
