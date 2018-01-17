'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const emailSchema = require('../schema/email.schema.js');

const emailSubject = 'Email from SSDC Site';

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        type: 'Oauth2',
        user: process.env.GMAIL_USERNAME,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN
    }
});

function validateEmailParams(req, res, next) {
    req.checkBody("emailAddress", "Enter a valid email address.").isEmail();
    req.checkBody("firstName", "Enter your first name.").isAlpha();
    req.checkBody("lastName", "Enter your last name.").isAlpha();
    req.checkBody("body", "Provide a message for the body of the email.")
        .optional()
        .isAscii()
        .isLength({max: 300});

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    next();
};

function appendInfoToEmailBody(req, res, next) {
    var appendage = `
        First name: ${req.body.firstName}
        Last name: ${req.body.lastName}
        Email address: ${req.body.emailAddress}
    `;

    req.body.body = `${req.body.body}\r\n\r\n${appendage}`;
    next();
};

function emailSSDC(req, res, next) {
    var mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: process.env.GMAIL_USERNAME,
        subject: emailSubject,
        text: req.body.body
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            next(err);
        } else {
            res.send(info.resposne);
        }
    });
};

function emailUFListServ(req, res, next) {
    var mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: process.env.LISTSERV_EMAIL,
        text: `Add SSDC-L ${req.body.emailAddress} ${req.body.firstName} ${req.body.lastName}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            next(err);
        } else {
            res.send(info.resposne);
        }
    });
};

router.post('/', upload.array(), validateEmailParams, appendInfoToEmailBody, emailSSDC);
router.post('/listserv', upload.array(), validateEmailParams, emailUFListServ)

module.exports = router;
