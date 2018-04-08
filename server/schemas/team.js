'use strict';

const mongoose = require('mongoose');

const MODEL_NAME = 'Team';

var teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  }
});

teamSchema.statics.getAll = function(callback) {
  this.model(MODEL_NAME).find({}, function(err, teams) {
    if (err) {
      return callback(err);
    }

    return callback(undefined, teams);
  });
}

var Team = module.exports = mongoose.model(MODEL_NAME, teamSchema);
