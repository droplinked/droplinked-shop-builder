import axios from "axios";
import useAppStore from "lib/stores/app/appStore";
import AppStorage from "lib/utils/app/sessions";
import { BASE_URL } from "lib/utils/app/variable";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Function to set the access token and refresh token in localStorage
const setToken = async (access_token, refresh_token) => useAppStore.setState((prev) => ({ ...prev, ...{ access_token, refresh_token } }))
let refreshPromise = null;
const clearPromise = () => refreshPromise = null;

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const { refresh_token } = useAppStore.getState();
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
            headers: { 'Authorization': `Bearer ${refresh_token}` },
        });
        const data = response?.data?.data;
        await setToken(data.access_token, data.refresh_token);
        return data.access_token;
    } catch (error) {
        AppStorage.clearStorage();
        window.location.replace(window.location.origin);
        throw error;
    }
};

// Add request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config) => {
        const appStore = useAppStore.getState().access_token || '';
        if (!config.headers.authorization) config.headers = {
            ...config.headers,
            'authorization': `Bearer ${appStore || ''}`,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration and refresh
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const config = error.config;

        if (error.response.status === 401 && !config._retry) {
            config._retry = true;

            if (!refreshPromise) refreshPromise = refreshAccessToken().finally(clearPromise)

            const token = await refreshPromise;
            config.headers.authorization = `Bearer ${token}`;
            return axiosInstance(config);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;