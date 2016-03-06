var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
  fbID: String,
  date: String,
  slot: Number,
  machine: {
    type: Schema.Types.ObjectId,
    ref: 'machine',
  },
});

module.exports = mongoose.model('schedule', scheduleSchema);

