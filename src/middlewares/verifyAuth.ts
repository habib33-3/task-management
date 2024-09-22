import { NextFunction, Request, Response } from "express";

import HttpStatusCode from "../enums/http-status";
import ApiError from "../error/ApiError";
import { verifyToken } from "../utils/jwt.utils";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization;

        if (!token) {
            throw new ApiError(
                HttpStatusCode.UNAUTHORIZED,
                "You are not authorized"
            );
        }

        const user = verifyToken("access-token", token);

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default verifyAuth;
