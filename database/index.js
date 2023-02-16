const mongoose = require('mongoose');

const config = require('../config');

module.exports = async function connectDB() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(config.databaseURI);

    console.log('DB Connected');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};
