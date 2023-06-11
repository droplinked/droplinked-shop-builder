import axiosInstance from "../axiosConfig";
import { IauthLoginService } from "./interfaces";

export const authLoginService = (params: IauthLoginService) => {
    return axiosInstance.post("auth/login", params)
};