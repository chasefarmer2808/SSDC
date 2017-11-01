'use strict';

const express = require('express');
const rp = require('request-promise');
const config = require('./config');

const router = express.Router();

router.get('/getEvents', function (req, res, next) {
  var accessToken = process.env.FB_ACCESS_TOKEN;

  var options = {
    uri: `${config.fbApiRootUrl}/${config.ssdcGroupId}/events`,
    qs: {
      since: Math.floor(Date.now()/1000).toString(),
      access_token: accessToken
    },
    json: true
  }

  rp(options)
    .then(function(events) {
      res.set('Access-control-Allow-origin', '*');
      
      events.data.forEach(function(event) {
        event.link = generateEventLink(event.id);
      })

      res.send(events);
    })
    .catch(function(err) {
      next(err);
    });
});

function generateEventLink(eventId) {
  return `https://facebook.com/events/${eventId}`;
}

module.exports = router;
