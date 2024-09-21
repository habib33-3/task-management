import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import {
    createUserZodSchema,
    loginUserZodSchema,
} from "../validations/user.validations";
import {
    createUserHandler,
    loginUserHandler,
} from "./../controllers/user.controllers";

const router = Router();

router.post("/", validateSchema(createUserZodSchema), createUserHandler);

router.post("/login", validateSchema(loginUserZodSchema), loginUserHandler);

export const userRoutes = router;
