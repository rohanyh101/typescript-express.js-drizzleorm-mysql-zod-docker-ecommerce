import { HttpException } from "./root";
import type { ErrorCode } from './root';

export class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any) {
        super(message, errorCode, 500, errors);
    }
}