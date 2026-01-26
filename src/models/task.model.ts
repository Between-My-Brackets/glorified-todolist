import mongoose, {Schema, Document} from "mongoose";

export interface TaskDocument extends Document {
    title: string;
    description?: string;
    status: "todo"|"doing"|"done";
}

const taskSchema = new Schema<TaskDocument>(
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

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);