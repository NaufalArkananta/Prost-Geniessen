import { NextFunction, Request, Response } from "express";
import { CartCreateValidationSchema, CartUpdateValidationSchema } from "../validations/cartValidation";

export const createCartValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = CartCreateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "),
        });
        return
    }
    next();
}

export const updateCartValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = CartUpdateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}