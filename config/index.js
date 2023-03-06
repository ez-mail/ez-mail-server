module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  saltRound: process.env.SALT_ROUND,
  cookieSecret: process.env.SECRET_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN,
  naverId: process.env.NAVER_ID,
  naverPassword: process.env.NAVER_PASSWORD,
  naverPort: process.env.NAVER_PORT,
};
