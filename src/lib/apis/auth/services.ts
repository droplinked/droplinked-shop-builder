import { createQueryString } from "../_utils/with.query";
import axiosInstance from "../axiosConfig";
import { IauthLoginService, IAuthSupportedWalletsService, ICompleteGoogleSignupService, IsignupService } from "./interfaces";

export const authLoginService = (params: IauthLoginService) => axiosInstance.post("auth/login/basic", params);

export const authSupportedWalletsService = () => axiosInstance.get<{ data: IAuthSupportedWalletsService[] }>("auth/supported/wallets");

export const googleService = () => axiosInstance.get(`auth/login/google`);

export const completeGoogleSignupService = ({ access_token, ...props }: ICompleteGoogleSignupService) =>
    axiosInstance.post(`auth/login/google/complete`, props, { headers: { authorization: `Bearer ${access_token}` } });

export const signupService = ({d3UserId, ...props}: IsignupService) => {
    const queryString = d3UserId && createQueryString({d3UserId: d3UserId})?.toString()
    return axiosInstance.post(`auth/register${queryString ? "?" + queryString?.toString() : ""}`, props);
};
