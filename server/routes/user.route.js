'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const verifyToken = require('../app/verifyToken.js');

const ROLES = {
  admin: 'admin',
  dev: 'dev',
  user: 'user'
};

var User = require('../schemas/user.js');

function isAdmin(req, res, next) {
  var userId = req.headers['x-access-token'];
  User.findById(userId, {password: 0}, function(err, user) {
    if (err) {
      return res.status(500).send('Error finding the user');
    }

    if (!user) {
      return res.status(401).send('No user found');
    }

    if (user.role === ROLES.admin) {
      next();
    } else {
      return res.status(401).send('Not authorized');
    }
  })
}

function isDev(userId, req, res, next) {
  User.findById(userId, {password: 0}, function(err, user) {
    if (err) {
      return res.status(500).send('Error finding the user');
    }

    if (!user) {
      return res.status(401).send('No user found');
    }

    if (user.role === ROLES.dev || user.role === ROLES.admin) {
      next();
    } else {
      return res.status(401).send('Not authorized');
    }
  })
}

router.get('/', verifyToken, isDev, function(req, res, next) {
  User.getAll(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

router.post('/create', upload.array(), function(req, res, next) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role || ROLES.user
  });

  newUser.save(function(err) {
    if (err) {
      return next(err);
    } else {
      newUser.validate(function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).send({username: newUser.username, role: newUser.role});
      });
    }
  })
});

router.get('/exist/:username', function(req, res, next) {
  User.findOne({'username': `${req.params.username}`}, function(err, user) {
    if (err) {
      next(err);
    }

    var doesExist = user != undefined;

    res.status(200).send(doesExist);
  });
});

module.exports = router;
