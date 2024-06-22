import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../database/db";
import { UserTable } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { get } from "lodash";

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// get the token from the header
	const accessToken = get(req, "headers.authorization", "").replace(
		/^Bearer\s/,
		"",
	);

	// throw error, if no token is found
	if (!accessToken) {
		// return res.status(401).json({ message: "Unauthorized" });
		return next();
	}

	// verify the token and extract the payload
	const secret = process.env.JWT_SECRET || "";

	try {
		// get the user from the payload
		const payload = jwt.verify(accessToken, secret) as any;

		const user = await db.query.UserTable.findFirst({
			where: eq(UserTable.id, payload.userId),
		});

		if (!user) {
			// return res.status(401).json({ message: "Unauthorized" });
			next();
		}

		// attach the user to the request object
		res.locals.user = user;
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
};

export default authMiddleware;
