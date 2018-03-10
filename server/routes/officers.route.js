'use strict';

const express = require('express');
const officers = require('../assets/data/officers.json');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send(officers.data);
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

module.exports = router;
