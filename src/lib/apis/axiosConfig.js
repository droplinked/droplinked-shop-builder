import axios from "axios"
import useAppStore from "lib/stores/app/appStore"
import AppStorage from "lib/utils/app/sessions"
import { BASE_URL } from "lib/utils/app/variable"

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

const set_tokens = async (access_token, refresh_token) =>
    useAppStore.setState((prev) => ({ ...prev, ...{ access_token, refresh_token } }))

let refreshPromise = null
let isRefreshing = false
let requests_queue = []

const clearPromise = () => {
    refreshPromise = null
    isRefreshing = false
}

const refresh_access_token = async () => {
    try {
        const refresh_token = AppStorage.refreshToken()
        console.log("refresh", refresh_token)
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
            headers: { 'Authorization': `Bearer ${refresh_token}` },
        })
        const data = response?.data?.data
        console.log("access",data.access_token)
        await set_tokens(data.access_token, data.refresh_token)
        requests_queue.forEach(callback => callback(data.access_token))
        requests_queue = []
        return data.access_token
    } catch (error) {
        AppStorage.clearStorage()
        console.log("error error")
        // window.location.replace(window.location.origin)
    }
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = AppStorage.accessToken() || ''
        if (!config.headers.authorization) config.headers = {
            ...config.headers,
            'authorization': `Bearer ${accessToken}`,
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error) {
        const original_request = error.config

        if (error.response.status === 401 && !original_request._retry) {
            if (!isRefreshing) {
                isRefreshing = true
                refreshPromise = refresh_access_token().finally(clearPromise)
            }

            const retry_original_request = new Promise(resolve => {
                requests_queue.push((token) => {
                    original_request.headers.Authorization = `Bearer ${token}`
                    resolve(axiosInstance(original_request))
                })
            })
            return retry_original_request
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
