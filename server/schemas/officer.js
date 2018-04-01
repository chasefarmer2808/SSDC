'use strict';

const mongoose = require('mongoose');
const FileSchema = require('./file');

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
  photo: {
    type: FileSchema,
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

// officerSchema.pre('remove', function(next) {
//   console.log('here');
// });

var Officer = module.exports = mongoose.model(MODEL_NAME, officerSchema);
