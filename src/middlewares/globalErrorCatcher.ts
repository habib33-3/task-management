import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import HttpStatusCode from "../enums/http-status";
import ApiError from "../error/ApiError";

export const globalErrorCatcher = (
    err: ApiError | ZodError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let errorMessages: { path: string; message: string }[] = [];

    if (err instanceof ZodError) {
        statusCode = HttpStatusCode.BAD_REQUEST;
        message = "Validation Error";
        errorMessages = err.errors.map((error) => ({
            path: error.path.join("."), // Join path elements to create a string
            message: error.message,
        }));
    } else if (err instanceof ApiError) {
        statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
        message = err.message || message;
    }

    const response = {
        success: false,
        statusCode,
        error: message,
        ...(errorMessages.length > 0 && { errors: errorMessages }),
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    res.status(statusCode).json(response);
};
