const Joi = require('joi');

module.exports = {
    body: {
        emailAddress: Joi.string(),
        body: Joi.string().required(),
        enableListServ: Joi.boolean().required()
    }
};