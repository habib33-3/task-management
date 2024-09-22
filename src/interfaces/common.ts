import { JwtPayload } from "jsonwebtoken";

export type TJwt = {
    email: string;
};

export type TPayload = JwtPayload & {
    email: string;
};
