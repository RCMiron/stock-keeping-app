var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  operation: String,
  from: String,
  to: String,
  by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Log = mongoose.model('Log', logSchema);
module.exports = Log;
