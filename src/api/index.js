import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || 'https://asoulcnki.asia/v1/api'
})
export { instance }