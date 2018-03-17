'use strict';

process.env.NODE_ENV = 'TEST';

const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const routeNames = require('../routes/route.names.js');
const emailRoute = require('../routes/email.route.js');

describe('Email Route Integration Tests', function() {
    var server, emailParamsTemplate;

    beforeEach(function() {
        server = require('../app/app.js')();
        emailParamsTemplate = {
            emailAddress: 'test@test.com',
            firstName: 'John',
            lastName: 'Smith',
            body: 'Test email'
        };
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function(done) {
      mongoose.connection.close(done);
    });

    it('should send email to SSDC gmail and return 200 when valid email parameters', function(done) {
        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(200, done);
    });

    it('should return an error code 400 when email address is not a string', function(done) {
        emailParamsTemplate.emailAddress = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('emailAddress');
                expect(body.msg).to.equal('Enter a valid email address.');
                done();
            });
    });

    it('should return an error code 400 when first name is not a string', function(done) {
        emailParamsTemplate.firstName = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('firstName');
                expect(body.msg).to.equal('Enter your first name.');
                done();
            });
    });

    it('should return an error code 400 when last name is not a string', function(done) {
        emailParamsTemplate.lastName = 1;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('lastName');
                expect(body.msg).to.equal('Enter your last name.');
                done();
            });
    });

    it('should return 200 if no email body provided', function(done) {
        delete emailParamsTemplate.body;

        request(server)
            .post(routeNames.emailRoute)
            .send(emailParamsTemplate)
            .expect(200, done);
    });

    it('should return an error code 400 if no email address provided', function(done) {
        delete emailParamsTemplate.emailAddress ;

        request(server)
        .post(routeNames.emailRoute)
        .send(emailParamsTemplate)
        .expect(400)
        .end(function(err, res) {
            var body = res.body[0];
            expect(body.param).to.equal('emailAddress');
            expect(body.msg).to.equal('Enter a valid email address.');
            done();
        });
    });

    it('should send email to the UF listserv and return 200', function(done) {
        request(server)
            .post(routeNames.listServRoute)
            .send(emailParamsTemplate)
            .expect(200, done);
    });

    it('should return an error code 400 when email address is not a string', function(done) {
        emailParamsTemplate.emailAddress = 1;

        request(server)
            .post(routeNames.listServRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('emailAddress');
                expect(body.msg).to.equal('Enter a valid email address.');
                done();
            });
    });

    it('should return an error code 400 when first name is not a string', function(done) {
        emailParamsTemplate.firstName = 1;

        request(server)
            .post(routeNames.listServRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('firstName');
                expect(body.msg).to.equal('Enter your first name.');
                done();
            });
    });

    it('should return an error code 400 when last name is not a string', function(done) {
        emailParamsTemplate.lastName = 1;

        request(server)
            .post(routeNames.listServRoute)
            .send(emailParamsTemplate)
            .expect(400)
            .end(function(err, res) {
                var body = res.body[0];
                expect(body.param).to.equal('lastName');
                expect(body.msg).to.equal('Enter your last name.');
                done();
            });
    });

});
