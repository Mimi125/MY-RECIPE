const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {type: String, required: true},
  ingrediants: {type: String, required: true},
  title_img: {type: String, required: false},
  contents1: {type: String, required: true},
  contents2: {type: String, required: true},
  contents3: {type: String, required: true},
  contents4: {type: String, required: true},
  contents5: {type: String, required: true},
  user: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ideas', ideaSchema);
