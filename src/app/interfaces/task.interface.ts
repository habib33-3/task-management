import { ObjectId } from "mongoose";

export type TaskStatus = "pending" | "in-progress" | "completed";

type TTask = {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    user: ObjectId;
};

export default TTask;
