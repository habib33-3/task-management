import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required. Please provide your name.",
            invalid_type_error:
                "Name must be a string. Please enter a valid name.",
        }),
        email: z
            .string({
                required_error:
                    "Email is required. Please provide your email address.",
            })
            .email({
                message:
                    "Email is invalid. Please enter a valid email address.",
            }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long.",
        }),
    }),
});

export type TCreateUser = z.infer<typeof createUserZodSchema>["body"];

export const loginUserZodSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error:
                    "Email is required. Please provide your email address.",
            })
            .email({
                message:
                    "Email is invalid. Please enter a valid email address.",
            }),
        password: z.string({
            required_error:
                "Password is required. Please provide your password.",
        }),
    }),
});

export type TLoginUser = z.infer<typeof loginUserZodSchema>["body"];
