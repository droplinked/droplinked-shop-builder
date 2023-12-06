import axios from "axios";
import AppStorage from "lib/utils/app/sessions";
import { BASE_URL } from "lib/utils/app/variable";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

const setToken = (access_token, refresh_token) => {
    let newData = JSON.parse(localStorage.getItem('appStore'))
    newData = {
        ...newData,
        state: {
            ...newData.state,
            access_token: access_token,
            refresh_token: refresh_token,
        }
    }
    localStorage.setItem('appStore', JSON.stringify(newData))
}

const refreshAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const appStore = JSON.parse(localStorage.getItem('appStore'))
            const query = await axios.post(BASE_URL + "/auth/refresh-token", {}, {
                headers: {
                    'Authorization': `Bearer ${appStore?.state?.refresh_token}`,
                }
            })
            const data = query?.data?.data
            setToken(data?.access_token, data?.refresh_token);
            resolve(data?.access_token)
        } catch (error) {
            reject(error)
            AppStorage.clearStorage()
            window.location.replace(window.location.origin)
        }
    })
}

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async config => {
        const appStore = JSON.parse(localStorage.getItem('appStore'))
        config.headers = {
            'Authorization': `Bearer ${appStore?.state?.access_token}`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
});

export default axiosInstance