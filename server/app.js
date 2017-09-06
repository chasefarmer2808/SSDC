'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
