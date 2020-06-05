//validation
const Joi = require('@hapi/joi');

// register validation
const validateRegistration = (data) => {
    const validationSchema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    }
    return Joi.validate(data, validationSchema);
}

const validateLogin = (data) => {
    const validationSchema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, validationSchema);
}

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;