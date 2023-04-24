import axios from "axios";
import { BASE_URL } from "lib/utils/app/variable";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const token = JSON.parse(localStorage.getItem("token"))

axiosInstance.interceptors.request.use(
    function (config) {
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