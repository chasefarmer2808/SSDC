'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();

var User = require('../schemas/user.js');

router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.send(users);
    }
  });
});

router.get('/:username/:password', function(req, res, next) {
  User.findByCredentials(req.params.username, req.params.password,
    function(err, isAuthenticated) {
      if (err) {
        return res.status(err.status).send(err.message);
      }

      // do JWT stuff here

  });
});

router.post('/create', upload.array(), function(req, res, next) {
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
      res.status(200).send(newUser);
    }
  })
});

module.exports = router;
