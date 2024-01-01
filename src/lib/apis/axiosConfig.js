import axios from "axios";
import useAppStore from "lib/stores/app/appStore";
import AppStorage from "lib/utils/app/sessions";
import { BASE_URL } from "lib/utils/app/variable";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Function to set the access token and refresh token in localStorage
const setToken = (access_token, refresh_token) => {
    useAppStore.setState(prev => ({ ...prev, ...{ access_token, refresh_token } }))
};

// Function to refresh the access token
const refreshAccessToken = async (refresh_token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/refresh-token`, {}, {
            headers: { 'Authorization': `Bearer ${refresh_token}`, },
        })
        const data = response?.data?.data;
        if (data) {
            setToken(data.access_token, data.refresh_token);
            return data.access_token;
        }
    } catch (error) {
        AppStorage.clearStorage();
        window.location.replace(window.location.origin);
        throw error;
    }
};

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config) => {
        const appStore = useAppStore.getState().access_token || '';
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${appStore || ''}`,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = useAppStore.getState().refresh_token || '';
                const access_token = await refreshAccessToken(refreshToken);
                console.log('error', error);
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;