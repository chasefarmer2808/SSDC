'use strict';

const request = require('supertest');
const mongoose = require('mongoose');

describe('SSDC Server Integration Tests', function() {
  var server;

  beforeEach(function() {
    server = require('../app/app.js')();
  });

  afterEach(function(done) {
    server.close();
    mongoose.connection.close(done);
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
