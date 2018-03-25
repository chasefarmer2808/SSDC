'use strict';

var bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

function hashPassword(password, callback) {
  bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
      if (err) {
        return callback(err);
      }
      return callback(null, hash);
  });
}

module.exports = hashPassword;
