import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        status: {
            type: String,
            enum: [
                "todo", "doing", "done"
            ],
            default: "todo",
        },
    },
    {
        timestamps: true
    },
);

export const Task = mongoose.model("Task", taskSchema);