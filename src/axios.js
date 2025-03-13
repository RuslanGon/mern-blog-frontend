import axios from "axios";

const instatnce = axios.create({
    baseURL: 'http://localhost:4444'
})


instatnce.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

export default instatnce