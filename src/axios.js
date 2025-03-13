import axios from "axios";

const instatnce = axios.create({
    baseURL: 'http://localhost:4444'
})

instatnce.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instatnce