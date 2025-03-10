import axios from "axios";

const instatnce = axios.create({
    baseURL: 'http://localhost:4444'
})

export default instatnce