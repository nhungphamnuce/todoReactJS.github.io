import axios from 'axios';
import { BASE_URL } from '../constants/Url';

export const axiosTodo = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    },
});
