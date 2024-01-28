import axiosInstance from "../axiosConfig";
import { IauthLoginService, IAuthSupportedWalletsService } from "./interfaces";

export const authLoginService = (params: IauthLoginService) => {
    return axiosInstance.post("auth/login", params)
};

export const authSupportedWalletsService = () => {
    return axiosInstance.get<{ data: IAuthSupportedWalletsService[] }>("auth/supported/wallets").then(response => response.data)
};