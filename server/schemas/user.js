const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MODEL_NAME = 'User'
const SALT_ROUNDS = 12;

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

// Instance methds
userSchema.statics.findByCredentials = function(username, password, callback) {
  this.model(MODEL_NAME).findOne({'username': `${username}`}, function(err, user) {
    if (err) {
      callback(err);
    }

    if (user) {
      bcrypt.compare(password, user.password).then(function(res) {
        if (res) {
          callback({}, user);
        }

        callback('Invalid password');
      });
    }
  });
}


// Schema hooks
userSchema.pre('save', hashPassword);

function hashPassword(next) {
  var newUser = this;
  bcrypt.hash(newUser.password, SALT_ROUNDS, function(err, hash) {
    if (err) {
      return next(err);
    }

    newUser.password = hash;
    next();
  });
};

var User = module.exports = mongoose.model(MODEL_NAME, userSchema);
