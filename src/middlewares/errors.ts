import type { NextFunction, Request, Response } from "express";
import type { HttpException } from "../exceptions/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode
    const message = error.message
    const errorCode = error.errorCode

    res.status(status).json({
        message,
        errorCode,
    });

    next()
}