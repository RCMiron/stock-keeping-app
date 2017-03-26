var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

var Location = mongoose.model('Location', locationSchema);
module.exports = Location;
