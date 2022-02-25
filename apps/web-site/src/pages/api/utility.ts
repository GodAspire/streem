/* eslint-disable @typescript-eslint/no-explicit-any */
import _cors from 'cors';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { Method } from 'axios';

export type ApiHandler<T = any> =
    | NextApiHandler
    | ((req: NextApiRequest, res: NextApiResponse<T>) => Promise<NextApiResponse<T>>);

export const methodGuard = <T = any>(handler: ApiHandler<T>, ...methods: Method[]) => {
    const allowed = methods.map(m => m.toUpperCase());

    const guard = async (req: NextApiRequest, res: NextApiResponse) => {
        const { method } = req;

        if (allowed.includes(method)) return await handler(req, res);

        res.setHeader('Allow', [...allowed]);
        res.status(405).end(`Method ${method} Not Allowed`);
    };

    return guard;
};

/**
 * Helper method to wait for a middleware to execute before continuing
 * @param {NextApiRequest} req - NextApiRequest
 * @param {NextApiResponse} res - NextApiResponse
 * @param {any} fn - The middleware function to execute.
 * @returns A promise.
 */
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
};

export const getGuard = (handler: ApiHandler, cors?: boolean | CorsOptions) => methodGuard(handler, 'get');
export const postGuard = (handler: ApiHandler, cors?: boolean | CorsOptions) => methodGuard(handler, 'post');
export const patchGuard = (handler: ApiHandler, cors?: boolean | CorsOptions) => methodGuard(handler, 'patch');
export const putGuard = (handler: ApiHandler, cors?: boolean | CorsOptions) => methodGuard(handler, 'put');
export const deleteGuard = (handler: ApiHandler, cors?: boolean | CorsOptions) => methodGuard(handler, 'delete');

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
type CorsOptions = _cors.CorsOptions | _cors.CorsOptionsDelegate<_cors.CorsRequest>;

export const Cors = (req: NextApiRequest, res: NextApiResponse, options?: CorsOptions) => {
    const cors = _cors(options);

    return new Promise((resolve, reject) => {
        cors(req, res, result => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
};

export { Cookies } from '../../utility/cookies';
