'use strict';

const express = require('express');
const rp = require('request-promise');
const config = require('./config');
const secrets = require('./secrets');

const router = express.Router();

router.get('/getEvents', function (req, res, next) {
  var options = {
    uri: `${config.fbApiRootUrl}/${config.ssdcGroupId}/events`,
    qs: {
      since: Math.floor(Date.now()/1000).toString(),
      access_token: secrets.fbAccessToken
    }
  }

  rp(options)
    .then(function(events) {
      res.set('Access-control-Allow-origin', '*');
      res.send(events);
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
