'use strict';

const express = require('express');
const officers = require('../assets/data/officers.json');
const ROLES = require('../config').roles;

var multer = require('multer');

var fileHandler = require('../app/file.handler');
var verifyToken = require('../middleware/verifyToken');
var isRole = require('../middleware/isRole');

var Officer = require('../schemas/officer');

const router = express.Router();

var upload = multer({
  storage: fileHandler.imageStorage,
  fileFilter: fileHandler.imageFilter
});

function validatePhoto(req, res, next) {
  console.log(req.file)

  req.checkBody('photo', 'Officer photo is required').exists();
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    return res.status(400).send(errors);
  }

  next();
}

router.get('/', function(req, res, next) {
  Officer.getAll(function(err, officers) {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send(officers);
  });
});

router.get('/photos', function(req, res, next) {
  Officer.getAllPhotos(function(err, officers) {
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

router.post('/create', upload.single('photo'), /*verifyToken, isRole.isDev*/ function(req, res, next) {
  var newOfficer = new Officer({
    name: req.body.name,
    role: req.body.role,
    emailAddress: req.body.emailAddress,
    bio: req.body.bio,
    photo: {
      filename: req.file.filename,
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
