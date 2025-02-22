import Joi from 'joi';

export const userValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),   
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userUpdateValidationSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    username: Joi.string().min(3).optional(),   
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    phone: Joi.string().optional(),
    profile: Joi.string().optional(),
});

export const userDeleteValidationSchema = Joi.object({
    phone: Joi.string().required(),
});