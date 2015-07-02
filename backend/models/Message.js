'use strict';

var mongoose = require('mongoose');
var nextID = 0;

var messageSchema = mongoose.Schema({
  id: String,
  threadName: { type: String, required: true },
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  timeStamp: {type: Date, default: Date.now()}
});

messageSchema.methods.getNextID = function getNextID() {
  nextID ++;
  return nextID;
}

module.exports = mongoose.model('Message', messageSchema);
