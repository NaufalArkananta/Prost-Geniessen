import { NextFunction, Request, Response } from "express";
import { productCreateValidationSchema, productUpdateValidationSchema } from "../validations/productValidation";

export const productCreateValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = productCreateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}

export const productUpdateValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = productUpdateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}
