'use strict';

const request = require('supertest');
const assert = require('chai').assert;
const routeNames = require('../routes/route.names.js');

describe('Email Route Integration Tests', function() {
    var server, emailParamsTemplate;

    beforeEach(function() {
        server = require('../app/app.js')();
        emailParamsTemplate = {
            emailAddress: 'test@test.com',
            firstName: 'John',
            lastName: 'Smith',
            body: 'Test email',
            enableListServ: false
        };
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('should send email to SSDC gmail and return 200 when valid email parameters', function(done) {
        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(200, done);
    });

    it('should return an error code 500 when email address is not a string', function(done) {
        emailParamsTemplate.emailAddress = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should return an error code 500 when first name is not a string', function(done) {
        emailParamsTemplate.firstName = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should return an error code 500 when last name is not a string', function(done) {
        emailParamsTemplate.lastName = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should return an error code 500 when email body is not a string', function(done) {
        emailParamsTemplate.body = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should return an error code 500 if no email address provided', function(done) {
        emailParamsTemplate.emailAddress = null;
        
        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should return an error code 500 if no enableListServ flag provided', function(done) {
        emailParamsTemplate.enableListServ = null;
        
        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(500, done);
    });

    it('should send email to the UF listserv and return 200', function(done) {
        emailParamsTemplate.enableListServ = true;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(200)
            .then(function(res) {
                done();
            });
    });

});