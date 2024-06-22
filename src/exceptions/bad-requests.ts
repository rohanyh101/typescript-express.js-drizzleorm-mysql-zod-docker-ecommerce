import { HttpException } from "./root";
import type { ErrorCode } from "./root";

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null)
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 401, null)
    }
}