import type { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next();
}

export default requireUser;