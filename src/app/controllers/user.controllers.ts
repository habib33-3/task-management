import { compare } from "bcrypt";
import { Request } from "express";

import HttpStatusCode from "../../enums/http-status";
import ApiError from "../../error/ApiError";
import asyncHandler from "../../shared/asyncHandler";
import sendResponse from "../../shared/sendResponse";
import User from "../models/user.model";
import { findUserByEmail } from "../services/user.services";
import { TCreateUser, TLoginUser } from "../validations/user.validations";

export const createUserHandler = asyncHandler(
    async (req: Request<object, object, TCreateUser>, res) => {
        const user = req.body;

        const result = await User.create(user);

        sendResponse(res, {
            statusCode: HttpStatusCode.CREATED,
            success: true,
            data: result,
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

        sendResponse(res, {
            statusCode: HttpStatusCode.OK,
            success: true,
            data: user,
            message: "user logged in",
        });
    }
);
