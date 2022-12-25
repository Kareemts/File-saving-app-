const mongoose = require('mongoose');
const collection = require('../collections/collectios');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const file_Schema = new mongoose.Schema({
  userId: ObjectId,
  FileName: String,
  uploadedTime: Date,
  userId: { type: ObjectId, ref: 'users' },
});
const file_data = mongoose.model(collection.FILE_COLLECTION, file_Schema);

module.exports = { file_data };
