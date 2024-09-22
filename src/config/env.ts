import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbUrl: process.env.DB_URL,
    saltRound: process.env.SALT_ROUND,
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as Secret,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as Secret,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
        accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    },
};
