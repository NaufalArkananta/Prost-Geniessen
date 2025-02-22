import Joi from "joi";

export const CartCreateValidationSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
    userId: Joi.string().required(),
});

export const CartUpdateValidationSchema = Joi.object({
    productId: Joi.string().optional(),
    quantity: Joi.number().min(1).optional(),
    price: Joi.number().min(1).optional(),
    userId: Joi.string().optional(),
});