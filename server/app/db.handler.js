'use strict';

var mongoose = require('mongoose');
const config = require('../config.js');

var handler = {
  init: function() {
    mongoose.connect(`${config.mongoUrl}/${config.prodDb}`);
    let db = mongoose.connection;

    db.once('open', function() {
      console.log('Connected to Mongo');
    });

    db.on('error', function(err) {
      console.log(err);
    });
  }
}

module.exports = handler;
