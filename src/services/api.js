import axios from "axios";

export const baseAPI = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

baseAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
        }
    }

    return config;
})