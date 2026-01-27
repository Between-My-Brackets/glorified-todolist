import { z } from "zod";

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().nonempty("Title is required"),
        description: z.string().nonempty("Description is required"),
    }),
});

export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["todo", "doing", "done"]).optional(),
    }),
    params: z.object({
        id: z.string(),
    }),
});
