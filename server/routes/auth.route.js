'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

var User = require('../schemas/user.js');

const TWENTY_FOUR_HOURS = 86400;
const FIFTEEN_MINUTES = 900;
const EXPIRE_IN_SECONDS = FIFTEEN_MINUTES;

router.post('/login', upload.array(), function(req, res, next) {
  User.findByCredentials(req.body.username, req.body.password,
    function(err, user) {
      if (err) {
        return res.status(err.status).send({auth: false, message: err.message});
      }

      var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: EXPIRE_IN_SECONDS
      });

      res.status(200).send({auth: true,
                            idToken: token,
                            expiresIn: EXPIRE_IN_SECONDS,
                            username: user.username,
                            role: user.role});
  });
});

router.get('/logout', function(req, res, next) {
  res.status(200).send({auth: false});
});

module.exports = router;
