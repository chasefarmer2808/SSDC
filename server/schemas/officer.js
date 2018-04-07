'use strict';

const mongoose = require('mongoose');

const MODEL_NAME = 'Officer';

var officerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  photoUri: {
    type: String,
    required: true
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
