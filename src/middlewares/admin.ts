import type { NextFunction, Request, Response } from "express";

const adminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

    const user = res.locals.user;

    if(user.role !== "ADMIN") {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next();
};

export default adminMiddleware;
