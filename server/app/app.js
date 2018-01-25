'use strict';

function makeServer() {

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const validator = require('express-validator');
  const morgan = require('morgan');
  const cors = require('cors');
  const errorHandler = require('./error.handler.js');

  const app = express();
  const port = process.env.PORT || 5000;

  const routeNames = require('../routes/route.names.js');
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

  app.get('/.well-known/acme-challenge/h5_W6j2t5pPPtV3dg9eTFpnVsts47O3yiBOGM2qb7GQ', function(req, res) {
    res.send('h5_W6j2t5pPPtV3dg9eTFpnVsts47O3yiBOGM2qb7GQ.MY4OaIUq_Yrql-b0w9Sw8VjIe54xz3bvuGeh39Pcr80');
  });

  app.set('port', port);

  var server = app.listen(port, function() {
    console.log(`Server listening on ${port}`);
  });

  return server;

}

module.exports = makeServer;
