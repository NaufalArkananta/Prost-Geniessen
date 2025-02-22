import { NextFunction, Request, Response } from "express";
import { categoryCreateValidationSchema, categoryUpdateValidationSchema } from "../validations/categoryValidation";

export const createCategoryValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = categoryCreateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "),
        });
        return
    }
    next();
}

export const updateCategoryValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = categoryUpdateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}