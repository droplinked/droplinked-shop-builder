import axiosInstance from "../axiosConfig";

export const variantOptionsService = () => {
    return axiosInstance.get("variant-options")
};
