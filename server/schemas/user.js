const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MODEL_NAME = 'User';
const SALT_ROUNDS = 12;

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

// Instance methods
userSchema.statics.findByCredentials = function(username, password, callback) {
  this.model(MODEL_NAME).findOne({'username': `${username}`}, function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error('User not found');
      err.status = 404;
      return callback(err);
    }

    bcrypt.compare(password, user.password).then(function(res) {
      if (res === true) {
        return callback(null, user);
      } else {
        var err = new Error('Invalid username or password');
        err.status = 401;
        return callback(err);
      }
    });
  });
}

userSchema.statics.getAll = function(callback) {
  this.model(MODEL_NAME).find({}, {password: 0}, function(err, users) {
    if (err) {
      return callback(err);
    }

    return callback(undefined, users);
  });
}

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.comparePassword = function(candidate, callback) {
  bcrypt.compare(candidate, this.password, function(err, match) {
    if (err) {
      return callback(err);
    }
    callback(null, match);
  })
}

var User = module.exports = mongoose.model(MODEL_NAME, userSchema);
