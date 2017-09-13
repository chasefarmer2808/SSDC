'use strict';

const express = require('express');
const rp = require('request-promise');
const config = require('./config');
const secrets = require('./secrets');

const router = express.Router();

router.get('/getEvents', function (req, res) {
  var options = {
    uri: `${config.fbApiRootUrl}/${config.ssdcGroupId}/events`,
    qs: {
      since: Math.floor(Date.now()/1000).toString(),
      access_token: secrets.fbAccessToken
    }
  }

  rp(options)
    .then(function(events) {
      res.send(events);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
