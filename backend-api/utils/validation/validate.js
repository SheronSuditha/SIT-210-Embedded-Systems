const Joi = require('@hapi/joi');

const regValidation = (data) => {
    const Validation = Joi.object({
        name: Joi.string().max(32).required(),
        email: Joi.string().required().email(),
        pass: Joi.string().min(4).required(),
        perm: Joi.string().required()
    })
    return Validation.validate(data);
}

const loginValidation = (data) => {
    const userValidation = Joi.object({
        email: Joi.string().required().email(),
        pass: Joi.string().min(4).required()
    })
    return userValidation.validate(data);
}

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;