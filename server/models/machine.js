var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('machine', machineSchema);

