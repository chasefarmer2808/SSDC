'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();

router.post('/', upload.array(), function (req, res, next) {
    
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

    var mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: process.env.GMAIL_USERNAME,
        subject: req.body.subject,
        text: req.body.body
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