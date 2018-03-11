'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();

var User = require('../schemas/user.js');

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
