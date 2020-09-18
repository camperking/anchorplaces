import Joi from 'joi';



export const registerScheme = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(24)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(4)
        .max(24)
        .required(),

    email: Joi.string()
        .email()
        .required()
});

export const loginScheme = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(24)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(4)
        .max(24)
        .required()
});

export const authScheme = Joi.object({
    sessionid: Joi.string().required()
});
