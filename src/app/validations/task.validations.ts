import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTaskInput: {
 *       type: "object",
 *       properties: {
 *         title: {
 *           type: "string",
 *           minLength: 3,
 *           maxLength: 100
 *         },
 *         description: {
 *           type: "string",
 *           minLength: 10
 *         },
 *         status: {
 *           type: "string",
 *           enum: ["pending", "in-progress", "completed"],
 *           default: "pending"
 *         },
 *         dueDate: {
 *           type: "string"
 *         }
 *       },
 *       required: ["title", "description", "status", "dueDate"]
 *     }
 */
export const createTaskZodSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    dueDate: z.string(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateTaskInput: {
 *       type: "object",
 *       properties: {
 *         title: {
 *           type: "string",
 *           minLength: 3,
 *           maxLength: 100,
 *           nullable: true
 *         },
 *         description: {
 *           type: "string",
 *           minLength: 10,
 *           nullable: true
 *         },
 *         dueDate: {
 *           type: "string",
 *           nullable: true
 *         }
 *       }
 *     }
 */
export const updateTaskZodSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(10).optional(),
    dueDate: z.string().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangeStatusInput: {
 *       type: "object",
 *       properties: {
 *         status: {
 *           type: "string",
 *           enum: ["pending", "in-progress", "completed"],
 *           nullable: true
 *         }
 *       }
 *     }
 */
export const changeStatusZodSchema = z.object({
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     TaskResponse: {
 *       type: "object",
 *       properties: {
 *         id: {
 *           type: "string"
 *         },
 *         title: {
 *           type: "string"
 *         },
 *         description: {
 *           type: "string"
 *         },
 *         status: {
 *           type: "string",
 *           enum: ["pending", "in-progress", "completed"]
 *         },
 *         dueDate: {
 *           type: "string"
 *         },
 *         createdAt: {
 *           type: "string",
 *           format: "date-time"
 *         },
 *         updatedAt: {
 *           type: "string",
 *           format: "date-time"
 *         }
 *       }
 *     }
 */
