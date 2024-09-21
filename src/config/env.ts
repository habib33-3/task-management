import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 5000,
    dbUrl: process.env.DB_URL,
    saltRound: process.env.SALT_ROUND,
};
