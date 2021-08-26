const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('../utils/validators');

const imageSchema = Schema({
  imageURL: {
    type: String,
  },
  isMain: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Image', imageSchema);

imageSchema.path('imageURL').validate(validators.urlValidator, 'Not valid url');
