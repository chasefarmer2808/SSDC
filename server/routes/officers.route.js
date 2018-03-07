'use strict';

const express = require('express');
const officers = require('../assets/data/officers.json');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send(officers.data);
});

module.exports = router;
