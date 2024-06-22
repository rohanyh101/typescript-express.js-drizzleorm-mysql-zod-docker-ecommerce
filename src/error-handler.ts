import type { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const errorHandler = (method: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await method(req, res, next);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			let exception: HttpException;

			if (err instanceof HttpException) {
				exception = err;
			} else {
				// runtime error
				exception = new InternalException(
					"Something went wrong",
					ErrorCode.INTERNAL_EXCEPTION,
					err,
				);
			}

			next(exception);
		}
	};
};
