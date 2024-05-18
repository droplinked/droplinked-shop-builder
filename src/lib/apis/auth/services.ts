import axiosInstance from "../axiosConfig";
import { IauthLoginService, IAuthSupportedWalletsService, ICompleteGoogleSignupService } from "./interfaces";

export const authLoginService = (params: IauthLoginService) => {
    return axiosInstance.post("auth/login", params);
};

export const authSupportedWalletsService = () => {
    return axiosInstance.get<{ data: IAuthSupportedWalletsService[] }>("auth/supported/wallets");
};

export const googleService = () => axiosInstance.get(`auth/login/google`);

export const completeGoogleSignupService = ({ access_token, ...props }: ICompleteGoogleSignupService) => axiosInstance.post(`auth/login/google/complete`, props, { headers: { authorization: `Bearer ${access_token}` } });
