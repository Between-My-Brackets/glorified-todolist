import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

//let tasks: any[] = [];
import { Task } from "../models/task.model.js";

export const createTask = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const task ={
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description,
            status: "todo",
            createdAt: new Date()
        };
        const createdRecord = await Task.create(task);
        res.status(201).json(task);
    }
    catch(err){
        next(err);
    }
}


export const getTasks = async (req: Request, res: Response) => {
    const {
        status,
        page = '1',
        limit = "10",
        sort = "createdAt",
    } = req.query;

    const filter: any = {};
    if(status){
        filter.status = status;
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber -1) * limitNumber;

    const tasks = await Task.find(filter)
        .sort({[sort as string]: -1})
        .skip(skip)
        .limit(limitNumber)

    const total = await Task.countDocuments(filter);

    res.json({
        page: pageNumber,
        limit: limitNumber,
        total,
        results: tasks.length,
        data: tasks
    });
}


export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try{

        if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
            return res.status(404).json({ message: "Task not found" });
        }
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

        if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
            return res.status(404).json({ message: "Task not found" });
        }
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

        if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
            return res.status(404).json({ message: "Task not found" });
        }
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not Found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export const getTaskStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskStats = stats.reduce((acc: any, stat: any) => {
            acc[stat._id] = stat.count;
            return acc;
        }, {});

        res.json(taskStats);
    } catch (err) {
        next(err);
    }
};