import { Request } from "express";

import HttpStatusCode from "../../enums/http-status";
import ApiError from "../../error/ApiError";
import asyncHandler from "../../shared/asyncHandler";
import sendResponse from "../../shared/sendResponse";
import Task from "../models/task.model";
import { findUserByEmail } from "../services/user.services";
import { TCreateTask } from "../validations/task.validations";

export const createTaskHandler = asyncHandler(
    async (req: Request<object, object, TCreateTask>, res) => {
        const task = req.body;
        const { email } = req.user!;

        const user = await findUserByEmail(email);

        if (!user) {
            throw new ApiError(HttpStatusCode.FORBIDDEN, "forbidden");
        }

        const result = await Task.create({
            ...task,
            user: user.id,
        });

        sendResponse(res, {
            statusCode: HttpStatusCode.CREATED,
            success: true,
            data: result,
            message: "Task created",
        });
    }
);

export const getAllTasksHandler = asyncHandler(async (req, res) => {
    const { email } = req.user!;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(HttpStatusCode.FORBIDDEN, "forbidden");
    }

    const tasks = await Task.find({
        user: user.id,
    });

    sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        data: tasks,
        message: "All tasks retrieved",
    });
});

export const getSingleTaskHandler = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        data: task,
        message: "Task retrieved",
    });
});

export const updateTaskHandler = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const updatedTask = req.body;

    const task = await Task.findByIdAndUpdate(taskId, updatedTask, {
        new: true,
    });

    sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        data: task,
        message: "Task updated",
    });
});

export const changeStatusHandler = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, "task not found");
    }

    task.status = status;

    task.save();

    sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        data: task,
        message: "status updated",
    });
});
