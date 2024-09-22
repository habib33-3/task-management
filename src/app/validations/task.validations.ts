import { z } from "zod";

export const TaskStatusEnum = z.enum(["pending", "in-progress", "completed"]);

export const createTaskZodSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters long")
            .max(100, "Title must be less than 100 characters"),
        description: z
            .string()
            .min(10, "Description must be at least 10 characters long"),
        status: TaskStatusEnum.default("pending"),
        dueDate: z.string(),
    }),
});

export type TCreateTask = z.infer<typeof createTaskZodSchema>["body"];

export const updateTaskZodSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters long")
            .max(100, "Title must be less than 100 characters")
            .optional(),
        description: z
            .string()
            .min(10, "Description must be at least 10 characters long")
            .optional(),

        dueDate: z.string().optional(),
    }),
});

export type TUpdateTask = z.infer<typeof updateTaskZodSchema>["body"];

export const changeStatusZodSchema = z.object({
    body: z.object({
        status: TaskStatusEnum.optional(),
    }),
});

export type TChangeStatus = z.infer<typeof changeStatusZodSchema>["body"];
