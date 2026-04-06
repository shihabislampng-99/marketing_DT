import axios from 'axios';

// Uses VITE_API_URL env variable at build time, falls back to new VPS domain
const API_URL = import.meta.env.VITE_API_URL || 'https://jinn.juhdi.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
