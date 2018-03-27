'use strict';

const express = require('express');
const officers = require('../assets/data/officers.json');
const ROLES = require('../config').roles;

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var verifyToken = require('../middleware/verifyToken');
var isRole = require('../middleware/isRole');
var imageFilter = require('../middleware/imageFilter');

var Officer = require('../schemas/officer');

const router = express.Router();

router.get('/', verifyToken, isRole.isDev, function(req, res, next) {
  Officer.getAll(function(err, officers) {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send(officers);
  });
});

router.get('/president', function(req, res, next) {
  var president;

  officers.data.forEach(function(officer) {
    if (officer.role == 'President') {
      president = officer;
    }
  });

  if (president) {
    res.send(president);
  } else {
    res.status(404).send('President not found');
  }
});

router.post('/create', upload.single('photo'), verifyToken, isRole.isDev, imageFilter, function(req, res, next) {
  var newOfficer = new Officer({
    name: req.body.name,
    role: req.body.role,
    emailAddress: req.body.emailAddress,
    bio: req.body.bio,
    photo: {
      data: req.file.path,
      contentType: req.file.mimetype
    }
  });

  newOfficer.save(function(err) {
    if (err) {
      return next(err);
    }

    newOfficer.validate(function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send(newOfficer);
    });
  });
});

module.exports = router;
