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
    // type: FileSchema,
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

officerSchema.statics.getFilename = function(firstName, lastName, callback) {
  var query = {
    firstName,
    lastName
  };
  this.model(MODEL_NAME).findOne(query, function(err, officer) {
    if (err) {
      return callback({status: 500, message: err});
    }

    if (!officer) {
      return callback({status: 404, message: 'No officer found'});
    }

    return callback(undefined, officer.photo.filename);
  });
}

var Officer = module.exports = mongoose.model(MODEL_NAME, officerSchema);
