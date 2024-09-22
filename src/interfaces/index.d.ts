import { JwtPayload } from "jsonwebtoken";

import { TJwt } from "./common";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
    namespace Express {
        interface Request {
            user?: (TJwt & JwtPayload) | null; // Optional user property
            // You can add other properties if needed
        }
    }
}
