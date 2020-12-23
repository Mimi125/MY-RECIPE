const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {type: String, required: true},
  ingrediants: {type: String, required: true},
  image_title: {type: Array, required: false},
  image_header: {type: Array, required: false},
  image1: {type: Array, required: false},
  image2: {type: Array, required: false},
  image3: {type: Array, required: false},
  image4: {type: Array, required: false},
  image5: {type: Array, required: false},
  contents1: {type: String, required: true},
  contents2: {type: String, required: true},
  contents3: {type: String, required: true},
  contents4: {type: String, required: true},
  contents5: {type: String, required: true},
  user: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ideas', ideaSchema);
