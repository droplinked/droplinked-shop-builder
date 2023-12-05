import axios from "axios";
import AppStorage from "lib/utils/app/sessions";
import { BASE_URL } from "lib/utils/app/variable";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

const setToken = (token) => {
    let newData = JSON.parse(localStorage.getItem('appStore'))
    newData = { ...newData, access_token: token }
    localStorage.setItem('appStore', newData)
}

const refreshAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const appStore = localStorage.getItem('appStore')
            console.log("newData", appStore?.state?.access_token)
            const refreshToken = await axiosInstance.post("refresh-token", {
                token: ''
            })
            console.log('refreshToken', refreshToken);
            // window.location.reload()
        } catch (error) {
            AppStorage.clearStorage()
            window.location.replace(window.location.origin)
            reject(null)
        }
    })
}

const reject = async (error) => {
    const statusCode = error?.response?.status
    if (statusCode && statusCode === 401 && AppStorage.accessToken()) {
        await refreshAccessToken()
    }
    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(
    function (config) {
        const token = AppStorage.accessToken()
        config.headers = {
            'Authorization': `Bearer ${token}`,
        }
        return config;
    },
    function (error) {
        return reject(error)
    }
);

axiosInstance.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        return reject(error)
    }
);

export default axiosInstance