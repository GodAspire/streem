import { Cookies, constants, stringify, uuid, getGuard, ApiHandler } from './utility';
import { AUTHORIZATION_URL } from '@streem/spotify/constants';

const AuthorizationHandler: ApiHandler = (req, res) => {
    const state = uuid();
    const cookies = Cookies(req, res);

    // extract params
    const { stateKey } = constants;
    const { client_id, redirect_uri, response_type, scope } = constants.params;

    // extract query params
    const show_dialog = req.query.dialog === 'true';
    // const customScope = query?.scope || scope;

    const params = stringify({
        scope,
        state,
        client_id,
        redirect_uri,
        response_type,
        show_dialog,
    });

    cookies.set(stateKey, state);
    res.redirect(AUTHORIZATION_URL + params);
};

export default getGuard(AuthorizationHandler);
