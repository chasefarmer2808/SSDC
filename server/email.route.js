'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var test = 'hello';

    var mailOptions = {
        from: '',
        to: process.env.GMAIL_USERNAME,
        subject: 'Test message',
        text: test
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            next(err);
        } else {
            console.log(info.response);
            res.send(info.resposne);
        }
    });
});

module.exports = router;