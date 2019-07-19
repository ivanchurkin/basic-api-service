const mongoose = require('mongoose');

const MONGO_USERNAME = 'ivan';
const MONGO_PASSWORD = 'qwerty123';
const MONGO_HOSTNAME = 'churkin.org';
const MONGO_PORT = '27017';
const MONGO_DB = 'basic-api-service';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = mongoose;
