'use strict';

const mongoose = require('mongoose');
var User = require('../schemas/user.js');

const ROLES = require('../config').roles;

module.exports = {
  isAdmin: function(userId, req, res, next) {
    User.findById(userId, {password: 0}, function(err, user) {
      if (err) {
        return res.status(500).send('Error finding the user');
      }

      if (!user) {
        return res.status(401).send('No user found');
      }

      if (user.role === ROLES.ADMIN) {
        next();
      } else {
        return res.status(401).send('Not authorized');
      }
    });
  },
  isDev: function(userId, req, res, next) {
    User.findById(userId, {password: 0}, function(err, user) {
      if (err) {
        return res.status(500).send('Error finding the user');
      }

      if (!user) {
        return res.status(401).send('No user found');
      }

      if (user.role === ROLES.DEV || user.role === ROLES.ADMIN) {
        next();
      } else {
        return res.status(401).send('Not authorized');
      }
    });
  }
};
