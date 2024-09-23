import { Router } from "express";

import validateSchema from "../../middlewares/validateSchema";
import verifyAuth from "../../middlewares/verifyAuth";
import {
    changeStatusHandler,
    createTaskHandler,
    getAllTasksHandler,
    getSingleTaskHandler,
    updateTaskHandler,
} from "../controllers/task.controller";
import {
    changeStatusZodSchema,
    createTaskZodSchema,
    updateTaskZodSchema,
} from "../validations/task.validations";

const router = Router();

/**
 * @openapi
 * {
 *   "components": {
 *     "schemas": {
 *       "CreateTaskInput": {
 *         "type": "object",
 *         "properties": {
 *           "title": {
 *             "type": "string",
 *             "minLength": 3,
 *             "maxLength": 100
 *           },
 *           "description": {
 *             "type": "string",
 *             "minLength": 10
 *           },
 *           "status": {
 *             "type": "string",
 *             "enum": ["pending", "in-progress", "completed"],
 *             "default": "pending"
 *           },
 *           "dueDate": {
 *             "type": "string"
 *           }
 *         },
 *         "required": ["title", "description", "status", "dueDate"]
 *       },
 *       "TaskResponse": {
 *         "type": "object",
 *         "properties": {
 *           "id": {
 *             "type": "string"
 *           },
 *           "title": {
 *             "type": "string"
 *           },
 *           "description": {
 *             "type": "string"
 *           },
 *           "status": {
 *             "type": "string",
 *             "enum": ["pending", "in-progress", "completed"]
 *           },
 *           "dueDate": {
 *             "type": "string"
 *           },
 *           "createdAt": {
 *             "type": "string",
 *             "format": "date-time"
 *           },
 *           "updatedAt": {
 *             "type": "string",
 *             "format": "date-time"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * @openapi
 * {
 *   "/api/v1/tasks": {
 *     "post": {
 *       "summary": "Create a new task",
 *       "tags": ["Tasks"],
 *       "security": [{"jwtAuth": []}],
 *       "requestBody": {
 *         "description": "Task data",
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/CreateTaskInput"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "201": {
 *           "description": "Task created successfully",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskResponse"
 *               }
 *             }
 *           }
 *         },
 *         "403": {
 *           "description": "Forbidden"
 *         },
 *         "400": {
 *           "description": "Bad Request"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post(
    "/",
    verifyAuth,
    validateSchema(createTaskZodSchema),
    createTaskHandler
);

/**
 * @openapi
 * {
 *   "/api/v1/tasks": {
 *     "get": {
 *       "summary": "Get all tasks for the logged-in user",
 *       "tags": ["Tasks"],
 *       "security": [{"jwtAuth": []}],
 *       "responses": {
 *         "200": {
 *           "description": "List of tasks retrieved successfully",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": {
 *                   "$ref": "#/components/schemas/TaskResponse"
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "403": {
 *           "description": "Forbidden"
 *         },
 *         "400": {
 *           "description": "Bad Request"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get("/", verifyAuth, getAllTasksHandler);

/**
 * @openapi
 * {
 *   "/api/v1/tasks/{taskId}": {
 *     "get": {
 *       "summary": "Get a single task by its ID",
 *       "tags": ["Tasks"],
 *       "security": [{"jwtAuth": []}],
 *       "parameters": [{
 *         "name": "taskId",
 *         "in": "path",
 *         "required": true,
 *         "description": "The ID of the task",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }],
 *       "responses": {
 *         "200": {
 *           "description": "Task retrieved successfully",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskResponse"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Task not found"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get("/:taskId", verifyAuth, getSingleTaskHandler);

/**
 * @openapi
 * {
 *   "/api/v1/tasks/{taskId}": {
 *     "patch": {
 *       "summary": "Update a task",
 *       "tags": ["Tasks"],
 *       "security": [{"jwtAuth": []}],
 *       "parameters": [{
 *         "name": "taskId",
 *         "in": "path",
 *         "required": true,
 *         "description": "The ID of the task to update",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }],
 *       "requestBody": {
 *         "description": "Task data to update",
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/UpdateTaskInput"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Task updated successfully",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskResponse"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Task not found"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.patch(
    "/:taskId",
    verifyAuth,
    validateSchema(updateTaskZodSchema),
    updateTaskHandler
);

/**
 * @openapi
 * {
 *   "/api/v1/tasks/change-status/{taskId}": {
 *     "patch": {
 *       "summary": "Change the status of a task",
 *       "tags": ["Tasks"],
 *       "security": [{"jwtAuth": []}],
 *       "parameters": [{
 *         "name": "taskId",
 *         "in": "path",
 *         "required": true,
 *         "description": "The ID of the task to change the status of",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }],
 *       "requestBody": {
 *         "description": "Status change data",
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/ChangeStatusInput"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Task status updated successfully",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskResponse"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Task not found"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.patch(
    "/change-status/:taskId",
    verifyAuth,
    validateSchema(changeStatusZodSchema),
    changeStatusHandler
);

export const taskRoutes = router;
