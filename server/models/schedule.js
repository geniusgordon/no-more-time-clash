var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
  nickname: String,
  time: Date,
  slot: Number,
  machine: {
    type: Schema.Types.ObjectId,
    ref: 'machine',
  },
});

module.exports = mongoose.model('schedule', scheduleSchema);

