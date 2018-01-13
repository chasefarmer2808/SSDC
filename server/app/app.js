'use strict';

function makeServer() {

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const cors = require('cors');
  const errorHandler = require('./error.handler.js');

  const app = express();
  const port = process.env.PORT || 5000;

  const fb = require('../routes/fb.route.js');
  const email = require('../routes/email.route.js');

  app.options('*', cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(errorHandler);
  app.use('/api/v1/fb', fb);
  app.use('/api/v1/email', email);

  var buildPath = '../../dist/';

  app.use(express.static(path.join(__dirname, `${buildPath}`)));
  app.use(express.static('./'));

  app.all('/*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, `../${buildPath}`) });
  });

  app.set('port', port);

  var server = app.listen(port, function() {
    console.log(`Server listening on ${port}`);
  });

  return server;

}

module.exports = makeServer;
