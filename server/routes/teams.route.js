'use strict';

const express = require('express');
const teams = require('../assets/data/teams.json');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send(teams.data);
});

module.exports = router;
