import React from "react";
import axios from "axios";

export const baseAPI = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

baseAPI.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${accessToken}`,
        }
    }

    return config;
});
