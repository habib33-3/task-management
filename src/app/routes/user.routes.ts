import { Router } from "express";
import {
    createUserHandler,
    loginUserHandler,
} from "./../controllers/user.controllers";

const router = Router();

router.post("/", createUserHandler);

router.post("/login", loginUserHandler);

export const userRoutes = router;
