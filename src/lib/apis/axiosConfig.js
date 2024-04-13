import axios from "axios"
import useAppStore from "lib/stores/app/appStore"
import AppStorage from "lib/utils/app/sessions"
import { BASE_URL } from "lib/utils/app/variable"

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

const setTokens = async (access_token, refresh_token) =>
    useAppStore.setState((prev) => ({ ...prev, ...{ access_token, refresh_token } }))

let refreshPromise = null
let isRefreshing = false

const clearPromise = () => {
    refreshPromise = null
    isRefreshing = false
}

// this function will refresh the access token
const refreshAccessToken = async () => {
    try {
        const refresh_token = AppStorage.refreshToken()
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
            headers: { 'Authorization': `Bearer ${refresh_token}` },
        })
        const data = response?.data?.data
        await setTokens(data.access_token, data.refresh_token)
        return data.access_token
    } catch (error) {
        AppStorage.clearStorage()
        window.location.replace(window.location.origin)
        throw error
    }
}

// Add request interceptor for API calls
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

// Add response interceptor to handle token expiration and refresh it
axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error) {
        const config = error.config

        if (error.response.status === 401 && !config._retry) {
            if (!isRefreshing) {
                isRefreshing = true
                refreshPromise = refreshAccessToken().finally(clearPromise)
            }

            const token = await refreshPromise
            config.headers.authorization = `Bearer ${token}`
            config._retry = true
            return axiosInstance(config)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance