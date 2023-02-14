module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  saltRound: process.env.SALTROUND,
  cookieSecret: process.env.SECRET_KEY,
};
