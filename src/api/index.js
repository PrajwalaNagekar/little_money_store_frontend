import axios from 'axios';
const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const api = axios.create({
    baseURL: VITE_BACKEND_LOCALHOST_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
