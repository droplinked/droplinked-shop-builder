import { createQueryString } from "utils/helpers/urlUtils";
import axiosInstance from "../axiosConfig";
import { IauthLoginService, IAuthSupportedWalletsService, ICompleteGoogleSignupService, IsignupService, IResetPasswordCodeVerify, IResetPassword } from "./interfaces";

export const authLoginService = (params: IauthLoginService) => axiosInstance.post("auth/login/basic", params);

export const authSupportedWalletsService = () => axiosInstance.get<{ data: IAuthSupportedWalletsService[] }>("auth/supported/wallets");

export const completeGoogleSignupService = ({ access_token, ...props }: ICompleteGoogleSignupService) =>
    axiosInstance.post(`auth/login/google/complete`, props, { headers: { authorization: `Bearer ${access_token}` } });

export const signupService = ({ d3UserId, udUserId, ...props }: IsignupService) => {
    let queryString;
    if (d3UserId !== undefined)
        queryString = createQueryString({ d3UserId: d3UserId })?.toString()
    else if (udUserId !== undefined)
        queryString = createQueryString({ udUserId: udUserId })?.toString()

    return axiosInstance.post(`auth/register${queryString ? "?" + queryString?.toString() : ""}`, props);
};

export const forgetPasswordService = (props: { email: string }) => {
    return axiosInstance.post(`auth/forgot-password`, props);
};

export const verifyResetPasswordCodeService = (props: IResetPasswordCodeVerify) => {
    return axiosInstance.post(`auth/reset-password-code`, props);
};

export const resetPasswordService = (props: IResetPassword) => {
    return axiosInstance.post(`auth/reset-password`, props);
};
