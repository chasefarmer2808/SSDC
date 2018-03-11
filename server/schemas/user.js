const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

function hashPassword(next) {
  var newUser = this;
  bcrypt.hash(newUser.password, SALT_ROUNDS, function(err, hash) {
    if (err) {
      return next(err);
    }

    newUser.password = hash;
    next();
  });
}

userSchema.pre('save', hashPassword);

var User = module.exports = mongoose.model('User', userSchema);
