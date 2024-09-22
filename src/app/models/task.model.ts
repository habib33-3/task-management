import { Schema, model } from "mongoose";

import TTask from "../interfaces/task.interface";

const TaskSchema = new Schema<TTask>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    dueDate: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});

const Task = model<TTask>("tasks", TaskSchema);

export default Task;
