'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./error.handler');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

const fb = require('./fb.route');
const email = require('./email.route');

app.use('/api/v1/fb', fb);
app.use('/api/v1/email', email);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);


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
