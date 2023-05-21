import axios from "axios";
import AppStorage from "lib/utils/app/sessions";
import { BASE_URL } from "lib/utils/app/variable";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});


axiosInstance.interceptors.request.use(
    function (config) {
        const token = AppStorage.accessToken()
        config.headers = {
            'Authorization': `Bearer ${token}`,
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance