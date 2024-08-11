const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  price: Number,
  img: String,
  desc: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);