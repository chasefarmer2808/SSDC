'use strict';

const mongoose = require('mongoose');

const MODEL_NAME = 'Officer';

var officerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  photo: {
    filename: String,
    contentType: String
  }
});

officerSchema.statics.getAll = function(callback) {
  this.model(MODEL_NAME).find({}, function(err, officers) {
    if (err) {
      return callback(err);
    }

    return callback(undefined, officers);
  });
}

var Officer = module.exports = mongoose.model(MODEL_NAME, officerSchema);
