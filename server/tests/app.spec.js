'use strict';

process.env.NODE_ENV = 'TEST';

const request = require('supertest');
const mongoose = require('mongoose');

describe('SSDC Server Integration Tests', function() {
  var server;

  beforeEach(function() {
    server = require('../app/app.js')();
  });

  afterEach(function(done) {
    mongoose.connection.close();
    server.close(done);
  });

  it('should respond to / with 200', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should respond to / with HTML content', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });
});
