import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";
import { fromZodError } from "zod-validation-error";
// import { UnprocessableEntityException } from "../exceptions/validation";
// import { ErrorCode } from "../exceptions/root";

export const validateResource =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse({
			body: req.body,
			query: req.query,
			params: req.params,
		});

		if (!result.success) {
			return res.status(400).json({ error: fromZodError(result.error) });
			// throw new UnprocessableEntityException("Validation error", ErrorCode.UNPROCESSABLE_ENTITY, fromZodError(result.error))
		}

		next();
	};

export default validateResource;
