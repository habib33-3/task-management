import jwt from "jsonwebtoken";

import env from "../config/env";
import { TPayload } from "../interfaces/common";

export const createToken = (
    tokenType: "access-token" | "refresh-token",
    payload: { email: string }
) => {
    const { email } = payload;
    const {
        accessTokenSecret,
        refreshTokenSecret,
        accessTokenExpiry,
        refreshTokenExpiry,
    } = env.jwt;

    const secret =
        tokenType === "access-token" ? accessTokenSecret : refreshTokenSecret;
    const expiresIn =
        tokenType === "access-token" ? accessTokenExpiry : refreshTokenExpiry;

    return jwt.sign({ email }, secret, { expiresIn });
};

export const verifyToken = (
    tokenType: "access-token" | "refresh-token",
    token: string
) => {
    const { accessTokenSecret, refreshTokenSecret } = env.jwt;

    const secret =
        tokenType === "access-token" ? accessTokenSecret : refreshTokenSecret;

    return jwt.verify(token, secret) as TPayload;
};
