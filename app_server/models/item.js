var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  count: {type: Number, default: 0},
  notes: String
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
