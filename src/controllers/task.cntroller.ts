import type { Request, Response, NextFunction } from "express";

let tasks: any[] = [];

export const createTask = (req: Request, res: Response, next: NextFunction) => {
    try{
        const task ={
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description,
            status: "todo",
            createdAt: new Date()
        };
        tasks.push(task);
        res.status(201).json(task);
    }
    catch(err){
        next(err);
    }
}


export const getTasks = (req: Request, res: Response) => {
    res.json(tasks);
}


export const getTaskById = (req: Request, res: Response, next: NextFunction) => {
    const task = tasks.find((t) => {
        t.id === req.params.id
    });

    if(!task){
        return res.status(404).json({message: "Task not Found"});
    }

    res.json(task);
}


export const updateTask = (req: Request, res: Response) => {
    const task = tasks.find((t) => {
        t.id === req.params.id
    });

    if(!task){
        return res.status(404).json({message: "Task not Found"});
    }

    Object.assign(task, req.body);
    res.json(task);
};


