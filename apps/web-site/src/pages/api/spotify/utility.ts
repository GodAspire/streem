const { SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SCOPE } = process.env;

export const constants = {
    config: {
        headers: {
            Authorization: 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    },
    params: {
        client_id: SPOTIFY_CLIENT_ID,
        scope: SPOTIFY_CLIENT_SCOPE,
        response_type: 'code',
        redirect_uri: 'http://localhost:4200/callback',
    },
    stateKey: 'spotify-auth-state',
};

// utility re-exports
export { toSingle, uuid, stringify } from '@streem/utility/misc';
export { Cookies, getGuard, postGuard, runMiddleware } from '../utility';

// type re-exports
export type { ApiHandler } from '../utility';
