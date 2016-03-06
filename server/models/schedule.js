var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
  nickname: String,
  time: Date,
  slot: Number,
});

module.exports = mongoose.model('schedule', scheduleSchema);

