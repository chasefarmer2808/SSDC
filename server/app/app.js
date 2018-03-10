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
  const teams = require('../routes/teams.route.js');
  const officers = require('../routes/officers.route.js');
  const BUILD_PATH = '../../dist/';

  function redirectToHomePage(req, res) {
    res.redirect('/');
  }

  function getHomePage(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, `${BUILD_PATH}`) });
  }

  // SECURITY RISK by allowing all Cross Origin Requests
  app.options('*', cors());

  // Prevent ACAO error in Chrome
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.json()); // allows the parsing of json data
  app.use(bodyParser.urlencoded({ extended: true })); // allows query string parsing
  app.use(validator()); // tell express to validate data objects
  app.use(morgan('dev')); // for event logging to the console
  app.use(errorHandler); // custome error hanlder function

  // api routes
  app.use(routeNames.facebookRoute, fb);
  app.use(routeNames.emailRoute, email);
  app.use(routeNames.teamsRoute, teams);
  app.use(routeNames.officersRoute, officers);

  // tell express to serve static content stored in the BUILD_PATH path
  app.use(express.static(path.join(__dirname, `${BUILD_PATH}`)));

  // allow express to serve the app on any valid route
  app.all('/*', getHomePage);

  // redirect to home page for invalid routes
  app.get('*', redirectToHomePage);

  app.set('port', port);

  var server = app.listen(port, function() {
    console.log(`Server listening on ${port}`);
  });

  return server;

}

module.exports = makeServer;
