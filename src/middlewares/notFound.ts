import { NextFunction, Request, Response } from "express";

import HttpStatusCode from "../enums/http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                method: req.method,
                message: "API Not Found",
            },
        ],
    });
    next();
};

export default notFound;
