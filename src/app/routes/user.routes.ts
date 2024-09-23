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
 *         "tags": ["user"],
 *         "description": "Create a new user",
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
 *   },
 *   "components": {
 *     "schemas": {
 *       "CreateUserInput": {
 *         "type": "object",
 *         "required": ["name", "email", "password"],
 *         "properties": {
 *           "name": {
 *             "type": "string",
 *             "description": "User's name",
 *             "example": "John Doe"
 *           },
 *           "email": {
 *             "type": "string",
 *             "description": "User's email",
 *             "example": "john.doe@example.com"
 *           },
 *           "password": {
 *             "type": "string",
 *             "description": "User's password",
 *             "example": "password123"
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
 *         "tags": ["user"],
 *         "description": "Log in a user",
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
 *   },
 *   "components": {
 *     "schemas": {
 *       "LoginUserInput": {
 *         "type": "object",
 *         "required": ["email", "password"],
 *         "properties": {
 *           "email": {
 *             "type": "string",
 *             "description": "User's email",
 *             "example": "john.doe@example.com"
 *           },
 *           "password": {
 *             "type": "string",
 *             "description": "User's password",
 *             "example": "password123"
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
 *         "tags": ["user"],
 *         "description": "Generate a new refresh token",
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
