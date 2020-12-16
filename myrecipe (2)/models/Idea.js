const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {type: String, required: true},
  ingrediants: {type: String, required: true},
  image_title: {type: String, required: false},
  image_header: {type: String, required: false},
  contents1: {type: String, required: true},
  image1: {type: String, required: false},
  contents2: {type: String, required: true},
  image2: {type: String, required: false},
  contents3: {type: String, required: true},
  image3: {type: String, required: false},
  contents4: {type: String, required: true},
  image4: {type: String, required: false},
  contents5: {type: String, required: true},
  image5: {type: String, required: false},
  user: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ideas', ideaSchema);
