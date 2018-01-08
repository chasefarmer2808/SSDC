'use strict';

const request = require('supertest');

describe('SSDC Server Integration Tests', function() {
  var server;

  beforeEach(function() {
    server = require('../app/app.js')();
  });

  afterEach(function(done) {
    server.close(done);
  });

  it('should respond to / with 200', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
