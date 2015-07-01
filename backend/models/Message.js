'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  id: String,
  threadID: String,
  authorName: String,
  text: String,
  timeStamp: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Message', messageSchema);
