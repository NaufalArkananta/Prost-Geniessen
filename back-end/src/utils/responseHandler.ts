import { Response } from 'express';

export const sendResponse = (res: Response, status: number, message: string = '', data: any) => {
    const response = {
        success: status >= 200 && status < 300,
        message: message,
        data: data,
    };

    res.status(status).json(response);
};