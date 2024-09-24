import { Router } from "express";

import validateSchema from "../../middlewares/validateSchema";
import {
    createUserZodSchema,
    loginUserZodSchema,
} from "../validations/user.validations";
import {
    createUserHandler,
    generateRefreshTokenHandler,
    loginUserHandler,
} from "./../controllers/user.controllers";

const router = Router();
/**
 * @openapi
 * {
 *   "paths": {
 *     "/api/v1/user/register": {
 *       "post": {
 *         "tags": ["User"],
 *         "summary": "Create a new user",
 *         "requestBody": {
 *           "required": true,
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/CreateUserInput"
 *               }
 *             }
 *           }
 *         },
 *         "responses": {
 *           "201": {
 *             "description": "User created successfully",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": true
 *                     },
 *                     "data": {
 *                       "type": "object",
 *                       "properties": {
 *                         "email": {
 *                           "type": "string",
 *                           "example": "john.doe@example.com"
 *                         },
 *                         "name": {
 *                           "type": "string",
 *                           "example": "John Doe"
 *                         }
 *                       }
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "user created"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           },
 *           "400": {
 *             "description": "Invalid request",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": false
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "Invalid request body"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

router.post(
    "/register",
    validateSchema(createUserZodSchema),
    createUserHandler
);

/**
 * @openapi
 * {
 *   "paths": {
 *     "/api/v1/user/login": {
 *       "post": {
 *         "tags": ["User"],
 *         "summary": "Log in a user",
 *         "requestBody": {
 *           "required": true,
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/LoginUserInput"
 *               }
 *             }
 *           }
 *         },
 *         "responses": {
 *           "200": {
 *             "description": "Login successful",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": true
 *                     },
 *                     "data": {
 *                       "type": "object",
 *                       "properties": {
 *                         "accessToken": {
 *                           "type": "string",
 *                           "example": "eyJhbGciOiJIUzI1NiIsInR..."
 *                         },
 *                         "email": {
 *                           "type": "string",
 *                           "example": "john.doe@example.com"
 *                         },
 *                         "name": {
 *                           "type": "string",
 *                           "example": "John Doe"
 *                         }
 *                       }
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "user logged in"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           },
 *           "403": {
 *             "description": "Wrong credentials",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": false
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "wrong credential"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/login", validateSchema(loginUserZodSchema), loginUserHandler);

/**
 * @openapi
 * {
 *   "paths": {
 *     "/api/v1/user/refresh-token": {
 *       "post": {
 *         "tags": ["User"],
 *         "summary": "Generate a new access token",
 *         "responses": {
 *           "200": {
 *             "description": "Refresh token generated successfully",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": true
 *                     },
 *                     "data": {
 *                       "type": "object",
 *                       "properties": {
 *                         "accessToken": {
 *                           "type": "string",
 *                           "example": "eyJhbGciOiJIUzI1NiIsInR..."
 *                         }
 *                       }
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "new access token generated"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           },
 *           "401": {
 *             "description": "Invalid token",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "success": {
 *                       "type": "boolean",
 *                       "example": false
 *                     },
 *                     "message": {
 *                       "type": "string",
 *                       "example": "invalid token"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/refresh-token", generateRefreshTokenHandler);

export const userRoutes = router;
