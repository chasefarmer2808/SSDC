'use strict';

const request = require('supertest');
const assert = require('chai').assert;

describe('Email Route Integration Tests', function() {
    var server;

    beforeEach(function() {
        server = require('../app/app.js')();
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('should return 200 with valid email parameters', function() {
        // assert.fail();

        request(server)
            .post('/api/v1/email')
            .field('emailAddress', 'test@test.com')
            .field('firstName', 'John')
            .field('lastName', 'Smith')
            .field('body', 'Test email')
            .field('enableListServ', false)
            .expect(200)
            .then(function(res) {
                console.log(res);
            });
    });

    it('should return an error code with an invalid email address', function() {
        assert.fail();
    });

    it('should return an error if no email address provided', function() {
        assert.fail();
    });

    it('should return an error code if on enableListServ flag provided', function() {
        assert.fail();
    });


});