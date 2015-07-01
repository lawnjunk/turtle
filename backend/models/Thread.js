'use strict';

var mongoose = require('mongoose');

var threadSchema = mongoose.Schema({
  threadName: String,
  users: [String]
})
