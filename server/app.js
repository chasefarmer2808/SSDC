'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./error.handler');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

const fb = require('./fb.route');
const email = require('./email.route');

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

var appDir = 'dist';

app.use(express.static(path.join(__dirname, `../${appDir}/`)));
app.use(express.static('./'));

app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, `../${appDir}`) });
});

app.set('port', port);

server.listen(port, function() {
  console.log(`Server listening on ${port}`);
});
