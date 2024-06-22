import { HttpException } from "./root";
import type { ErrorCode } from './root';

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors?: any) {
        super(message, errorCode, 401, errors);
    }
}