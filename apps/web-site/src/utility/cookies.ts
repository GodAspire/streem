import { setCookies, getCookie, removeCookies } from 'cookies-next';

import type { IncomingMessage, ServerResponse } from 'http';
import type { CookieSerializeOptions } from 'cookie';

// cookies helper
/**
 * It returns a set of functions that can be used to set, get, and clear cookies.
 * @param {IncomingMessage} [req] - IncomingMessage
 * @param {ServerResponse} [res] - The response object.
 * @param {OptionsType} [options] - OptionsType
 * @returns An object with the helper methods
 */
export const Cookies = (req?: IncomingMessage, res?: ServerResponse, options?: OptionsType) => {
    options = { ...options, req, res };

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const config = (opts?: OptionsType) => <OptionsType>{ ...options, ...opts };

    return {
        set: <T = unknown>(key: string, value: T, options?: OptionsType) => setCookies(key, value, config(options)),
        get: (key: string, options?: OptionsType) => getCookie(key, config(options)),
        clear: (key: string, options?: OptionsType) => removeCookies(key, config(options)),
    };
};

interface OptionsType extends CookieSerializeOptions {
    res?: ServerResponse;
    req?: IncomingMessage & {
        cookies?: {
            [key: string]: string;
        };
    };
}
