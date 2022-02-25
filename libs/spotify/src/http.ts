import axios from 'axios';
import { stringify } from '@streem/utility/misc/strings';

import { API_URL } from './constants';

const http = axios.create({
    baseURL: API_URL,
    paramsSerializer: stringify,
});

export default http;
