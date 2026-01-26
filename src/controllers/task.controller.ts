import type { Request, Response, NextFunction } from "express";

//let tasks: any[] = [];
import { Task } from "../models/task.model";

export const createTask = (req: Request, res: Response, next: NextFunction) => {
    try{
        const task ={
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description,
            status: "todo",
            createdAt: new Date()
        };
        Task.create(task);
        res.status(201).json(task);
    }
    catch(err){
        next(err);
    }
}


export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
}


export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message: "Task not Found"});
        }

        res.json(task);
    }
    catch(err){
        next(err);
    }
}


export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators:true
            }
        );

        if(!task){
            return res.status(404).json({message: "Task not Found"});
        }

        Object.assign(task, req.body);
        res.json(task);
    }
    catch(err){
        next(err)
    }
};


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not Found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};