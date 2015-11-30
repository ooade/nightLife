'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  eventId: String,
  username: String,
  place: String
});

module.exports = mongoose.model('Events', EventSchema);