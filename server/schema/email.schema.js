const Joi = require('joi');

module.exports = {
    body: {
        emailAddress: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        body: Joi.string(),
        enableListServ: Joi.boolean().required()
    }
};