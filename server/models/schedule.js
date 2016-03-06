var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
  nickname: String,
  year: Number,
  month: Number,
  day: Number,
  slot: Number,
  machine: {
    type: Schema.Types.ObjectId,
    ref: 'machine',
  },
});

module.exports = mongoose.model('schedule', scheduleSchema);

