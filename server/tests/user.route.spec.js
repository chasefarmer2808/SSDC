'use strict';

const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const routeNames = require('../routes/route.names.js');
const emailRoute = require('../routes/email.route.js');
const config = require('../config.js');

const CONN_STRING = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds163918.mlab.com/${config.testDb}`

describe('User Route Integration Tests', function() {
    var server, dbConnection;

    beforeEach(function(done) {
      server = require('../app/app.js')();

      // make a test database
      mongoose.connect(CONN_STRING);
      dbConnection = mongoose.connection;
      dbConnection.on('error', console.error.bind(console, 'connection error'));
      dbConnection.once('open', function() {
        console.log(`Connected to database ${config.testDb}`);
        done();
      });
    });

    it('pass', function(done) {
      done();
    });

    afterEach(function(done) {
      server.close();
      mongoose.connection.close(done);
    });


});
