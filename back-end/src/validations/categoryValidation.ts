import Joi from "joi";

export const categoryCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

export const categoryUpdateValidationSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
});