import axios from "axios";

export const baseAPI = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {'Content-Type': 'application/json'}
});