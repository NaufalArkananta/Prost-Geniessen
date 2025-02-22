import { NextFunction, Request, Response } from "express";
import { userDeleteValidationSchema, userUpdateValidationSchema, userValidationSchema } from "../validations/userValidation";

export const createValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = userValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}

export const updateValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = userUpdateValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
        return
    }
    next();
}

export const deleteValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = userDeleteValidationSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        res.status(400).json({
            message: "Password is required",
        });
        return
    }
    next();
}
