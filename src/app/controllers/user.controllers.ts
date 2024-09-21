import HttpStatusCode from "../../enums/http-status";
import asyncHandler from "../../shared/asyncHandler";
import sendResponse from "../../shared/sendResponse";
import User from "../models/user.model";
import { findUserByEmail } from "../services/user.services";

export const createUserHandler = asyncHandler(async (req, res) => {
    const user = req.body;

    const result = await User.create(user);

    sendResponse(res, {
        statusCode: HttpStatusCode.CREATED,
        success: true,
        data: result,
        message: "user created",
    });
});

export const loginUserHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (password === user?.password) {
        sendResponse(res, {
            statusCode: HttpStatusCode.OK,
            success: true,
            data: user,
            message: "user logged in successfully",
        });
    }
});
