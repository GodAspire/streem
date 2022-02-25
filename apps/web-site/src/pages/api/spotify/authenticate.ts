import axios from 'axios';
import Cors from 'cors';

import { Cookies, constants, stringify, postGuard, runMiddleware, ApiHandler } from './utility';
import { AUTHENTICATION_URL, AuthenticationResponse } from '@streem/spotify/index';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '500kb',
        },
    },
};

const cors = Cors({ methods: ['POST'] });

const AuthenticationHandler: ApiHandler = async (req, res) => {
    await runMiddleware(req, res, cors);

    const cookies = Cookies(req, res);

    const { params, stateKey, config } = constants;
    const { redirect_uri } = params;

    const code = req.body.code || null;
    const state = req.body.state || null;
    const storedState = cookies.get(stateKey) || null;

    cookies.clear(stateKey);

    if (state === null || state !== storedState) {
        return res.status(401).json({ error: 'state mismatch' });
    }

    try {
        const body = stringify({
            code: code,
            redirect_uri,
            grant_type: 'authorization_code',
        });

        const { status, data } = await axios.post<AuthenticationResponse>(AUTHENTICATION_URL, body, config);

        if (status === 200 && data) {
            res.status(200).json(data);
        } else res.status(401).json(data || { error: 'failed to authenticate' });
    } catch (err) {
        res.status(401).json({ error: 'invalid token' });
    }
};

export default postGuard(AuthenticationHandler);
