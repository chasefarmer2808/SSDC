'use strict';

function makeServer() {

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const validator = require('express-validator');
  const morgan = require('morgan');
  const cors = require('cors');
  const mongoose = require('mongoose');
  const errorHandler = require('./error.handler.js');

  const routeNames = require('../routes/route.names.js');
  const fb = require('../routes/fb.route.js');
  const email = require('../routes/email.route.js');
  const config = require('../config.js');

  mongoose.connect(config.mongoUrl);
  let db = mongoose.connection;

  db.once('open', function() {
    console.log('Connected to Mongo');
  });

  db.on('error', function(err) {
    console.log(err);
  });

  const app = express();
  const port = process.env.PORT || 5000;

  app.options('*', cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(validator());
  app.use(morgan('dev'));
  app.use(errorHandler);
  app.use(routeNames.facebookRoute, fb);
  app.use(routeNames.emailRoute, email);

  var buildPath = '../../dist/';

  app.use(express.static(path.join(__dirname, `${buildPath}`)));
  app.use(express.static('./'));

  app.all('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, `${buildPath}`) });
  });

  app.set('port', port);

  var server = app.listen(port, function() {
    console.log(`Server listening on ${port}`);
  });

  return server;

}

module.exports = makeServer;
