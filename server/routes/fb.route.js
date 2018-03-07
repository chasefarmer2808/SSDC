'use strict';

const express = require('express');
const rp = require('request-promise');
const config = require('../config.js');

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
      res.send(events.data);
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/albums', function(req, res, next) {
  var accessToken = process.env.FB_ACCESS_TOKEN;

  var options = {
    uri: `${config.fbApiRootUrl}/${config.ssdcGroupId}/albums`,
    qs : {
      access_token: accessToken
    },
    json: true
  };

  rp(options)
    .then(function(albums) {
      res.set('Access-control-Allow-origin', '*');

      res.send(albums.data);
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/album/:albumId', function(req, res, next) {
  var accessToken = process.env.FB_ACCESS_TOKEN;

  var options = {
    uri: `${config.fbApiRootUrl}/${req.params.albumId}/photos?fields=source,width,height`,
    qs : {
      access_token: accessToken
    },
    json: true
  };

  rp(options)
    .then(function(album) {
      res.set('Access-control-Allow-origin', '*');

      res.send(album.data);
    })
    .catch(function(err) {
      next(err);
    });
});

function generateEventLink(eventId) {
  return `https://facebook.com/events/${eventId}`;
}

module.exports = router;
