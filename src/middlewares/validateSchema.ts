import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateSchema =
    (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
                cookies: req.cookies,
            });
        } catch (error) {
            next(error);
        }
    };

export default validateSchema;
