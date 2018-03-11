'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const verifyToken = require('../app/verifyToken.js');

var User = require('../schemas/user.js');

function isAdmin(req, res, next) {
  User.findById(req.userId, {password: 0}, function(err, user) {
    if (err) {
      return res.status(500).send('Error finding the user');
    }

    if (!user) {
      return res.status(401).send('No user found');
    }

    if (user.isAdmin) {
      next();
    } else {
      return res.status(401).send('Not authorized');
    }
  })
}

router.post('/create', upload.array(), verifyToken, isAdmin, function(req, res, next) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  newUser.save(function(err) {
    if (err) {
      next(err);
    } else {
      newUser.validate(function(err) {
        if (err) {
            next(err);
        }
      });
      res.status(200).send(newUser.username);
    }
  })
});

module.exports = router;
