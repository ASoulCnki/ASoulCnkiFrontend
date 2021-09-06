import axios from 'axios';
axios.defaults.timeout = 4000 // mill seconds
const instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API || 'https://asoulcnki.asia/v1/api'
})

instance.interceptors.request.use(config => {
    let url = config.url
    if (config.method === 'get' && config.params) {
        url += '?'
        for (let key in config.params) {
            if (config.params[key].toString() != '')
                url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
        url = url.substring(0, url.length - 1)
        config.params = {}
    }
    config.url = url
    return config
})

instance.interceptors.response.use(
    response => {
        return response
    },
    // When res.status != 200
    // ployfill for Promise.all
    error => {
        return Promise.resolve({data:{code: 1}})
    }
)
export { instance }