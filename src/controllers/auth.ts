import type { NextFunction, Request, Response } from "express";
import { db } from "../database/db";
import { UserTable } from "../../drizzle/schema";
import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
// import { BadRequestsException, UnauthorizedException } from "../exceptions/bad.requests";
// import { ErrorCode } from "../exceptions/root";
import { eq } from "drizzle-orm";
import { omit } from "lodash";

export const signupHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password, name } = req.body;

	const user = await db.query.UserTable.findFirst({
		where: eq(UserTable.email, email),
	});

	if (user) {
		return res.status(400).json({ message: "User already exists" });
		// need to throw an error here and continue to next middleware, but !!!
		// throw new BadRequestsException("User already exists", ErrorCode.USER_ALREADY_EXISTS)
	}

	const newUser = await db.insert(UserTable).values({
		email,
		name,
		password: hashSync(password, 10),
	});

	res.json({ data: newUser });
};

export const loginHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await db.query.UserTable.findFirst({
		where: eq(UserTable.email, email),
	});

	if (!user) {
		return res.status(400).json({ message: "Invalid email or password" });
		// throw new UnauthorizedException("Invalid email or password", ErrorCode.USER_ALREADY_EXISTS)
	}

	if (!compareSync(password, user.password)) {
		return res.status(400).json({ message: "Invalid email or password" });
		// throw new UnauthorizedException("Invalid email or password", ErrorCode.USER_ALREADY_EXISTS)
	}

	const secret = process.env.JWT_SECRET || "";

	const token = jwt.sign(
		{
			userId: user.id,
		},
		secret,
		{
			expiresIn: "1h",
		},
	);

	res.json({ user, token });
};

export const whoAmIHandler = async (req: Request, res: Response) => {
	res.json({
		user: omit(res.locals.user, ["id", "password", "updatedAt", "createdAt"]),
	});
};
