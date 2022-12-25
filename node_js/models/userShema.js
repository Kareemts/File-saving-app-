const mongoose = require('mongoose');
const collection = require('../collections/collectios');

const user_Schema = new mongoose.Schema({
  fullName: String,
  userName:String,
  password:String,
  role:String,
});
const user_data = mongoose.model(
  collection.USER_COLLECTION,
  user_Schema
);

module.exports = { user_data };
