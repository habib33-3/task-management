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

router.post(
    "/",
    verifyAuth,
    validateSchema(createTaskZodSchema),
    createTaskHandler
);

router.get("/", verifyAuth, getAllTasksHandler);

router.get("/:taskId", verifyAuth, getSingleTaskHandler);

router.patch(
    "/:taskId",
    verifyAuth,
    validateSchema(updateTaskZodSchema),
    updateTaskHandler
);

router.patch(
    "/change-status/:taskId",
    verifyAuth,
    validateSchema(changeStatusZodSchema),
    changeStatusHandler
);

export const taskRoutes = router;
