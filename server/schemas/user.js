const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);
