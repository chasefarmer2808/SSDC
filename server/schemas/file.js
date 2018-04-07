'use strict';

const mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
});

module.exports = fileSchema;
