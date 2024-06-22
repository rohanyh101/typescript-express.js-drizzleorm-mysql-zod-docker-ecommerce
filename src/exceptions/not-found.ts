import { HttpException } from "./root";
import type { ErrorCode } from './root';

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any) {
        super(message, errorCode, 404, errors);
    }
}