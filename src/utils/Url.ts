import axios from 'axios';

export const HOST_URL = 'https://dmsreactapi.mssplonline.com/api/';

export const api = axios.create({
  baseURL: HOST_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
