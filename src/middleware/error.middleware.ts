import type {Request, Response, NextFunction} from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.name === "CastError") {
        return res.status(404).json({
            message: "Resource not found"
        });
    }

    console.error(err);
    res.status(500).json({
        error: err.message ||
        "Internal server error"
    });
};