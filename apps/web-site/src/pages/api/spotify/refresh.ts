import axios from 'axios';
import Cors from 'cors';

import { constants, stringify, postGuard, runMiddleware, ApiHandler } from './utility';
import { AUTHENTICATION_URL, ReAuthenticationResponse } from '@streem/spotify/index';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '500kb',
        },
    },
};

const cors = Cors({ methods: ['POST'] });

const RefreshHandler: ApiHandler = async (req, res) => {
    await runMiddleware(req, res, cors);
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({ error: 'no token provided' });
    }

    try {
        const body = stringify({
            grant_type: 'refresh_token',
            refresh_token,
        });

        const { config } = constants;
        const { status, data } = await axios.post<ReAuthenticationResponse>(AUTHENTICATION_URL, body, config);

        if (status === 200 && data) {
            res.status(200).json(data);
        } else res.status(401).json({ ...(data || {}), customError: 'failed to reauthenticate' });
    } catch (err) {
        res.status(401).json({ error: 'invalid token' });
    }
};

export default postGuard(RefreshHandler);
