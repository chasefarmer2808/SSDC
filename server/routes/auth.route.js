'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

var User = require('../schemas/user.js');

const TWENTY_FOUR_HOURS = 86400;

router.post('/login', upload.array(), function(req, res, next) {
  User.findByCredentials(req.body.username, req.body.password,
    function(err, user) {
      if (err) {
        return res.status(err.status).send({auth: false, message: err.message});
      }

      var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: TWENTY_FOUR_HOURS
      });

      res.status(200).send({auth: true, token: token});
  });
})

module.exports = router;
