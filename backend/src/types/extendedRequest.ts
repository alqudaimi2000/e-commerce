import type { Request } from 'express';

interface ExtendRequest extends Request {
    user?: any;
}
export type { ExtendRequest };