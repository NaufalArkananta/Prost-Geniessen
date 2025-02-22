import Joi from "joi";

export const productCreateValidationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),   
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(1).required(),
    alcoholLevel: Joi.number().min(1).required(),
    volume: Joi.number().min(1).required(),
    imageUrl: Joi.string().min(1).required(),
    categoryId: Joi.string().min(1).required(),
});

export const productUpdateValidationSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    description: Joi.string().min(1).optional(),   
    price: Joi.number().min(1).optional(),
    stock: Joi.number().min(1).optional(),
    alcoholLevel: Joi.number().min(1).optional(),
    volume: Joi.number().min(1).optional(),
    imageUrl: Joi.string().min(1).optional(),
    categoryId: Joi.string().min(1).optional(),
});
