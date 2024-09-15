export const API_URL = 'https://api-music-two.vercel.app';
//export const API_URL = 'http://localhost:3001';

import axios from 'axios';

export const api_base = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

