import { Request } from 'express';

export type ExtendedRequest = Request & {
    userId?: number  // Use ? se o userId não for sempre definido
};