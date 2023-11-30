const mongoose = require('mongoose');

const PlatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
});

const Plat = mongoose.model('Plat', PlatSchema);

module.exports = Plat;