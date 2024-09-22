import { compare } from "bcrypt";
import { CookieOptions, Request } from "express";

import env from "../../config/env";
import HttpStatusCode from "../../enums/http-status";
import ApiError from "../../error/ApiError";
import asyncHandler from "../../shared/asyncHandler";
import sendResponse from "../../shared/sendResponse";
import { createToken, verifyToken } from "../../utils/jwt.utils";
import User from "../models/user.model";
import { findUserByEmail } from "../services/user.services";
import { TCreateUser, TLoginUser } from "../validations/user.validations";

const cookieOptions: CookieOptions = {
    secure: env.env === "production",
    httpOnly: true,
};

export const createUserHandler = asyncHandler(
    async (req: Request<object, object, TCreateUser>, res) => {
        const user = req.body;

        const result = await User.create(user);

        sendResponse(res, {
            statusCode: HttpStatusCode.CREATED,
            success: true,
            data: {
                email: result.email,
                name: result.name,
            },
            message: "user created",
        });
    }
);

export const loginUserHandler = asyncHandler(
    async (req: Request<object, object, TLoginUser>, res) => {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            throw new ApiError(HttpStatusCode.FORBIDDEN, "wrong credential");
        }

        const isPasswordMatched = await compare(password, user.password);

        if (!isPasswordMatched) {
            throw new ApiError(HttpStatusCode.FORBIDDEN, "wrong credential");
        }

        const accessToken = createToken("access-token", { email });
        const refreshToken = createToken("refresh-token", { email });

        res.cookie("token", refreshToken, cookieOptions);

        const result = {
            accessToken,
            email: user.email,
            name: user.name,
        };

        sendResponse(res, {
            statusCode: HttpStatusCode.OK,
            success: true,
            data: result,
            message: "user logged in",
        });
    }
);

export const generateRefreshTokenHandler = asyncHandler(async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        throw new ApiError(HttpStatusCode.UNAUTHORIZED, "invalid token");
    }

    const payload = verifyToken("refresh-token", token);

    const { email } = payload;

    const accessToken = createToken("access-token", { email });

    sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        data: { accessToken },
        message: "new access token generated",
    });
});
