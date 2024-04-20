import axiosInstance from "../axiosConfig";
import { IGetUserService, IRetrieveNFTs, IchangePasswordService, IemailVerifyService, IforgetPasswordService, IresendEmailService, IsignupService, IuserUpdateService } from "./interfaces";

export const signupService = (props: IsignupService) => {
    return axiosInstance.post(`user/signup`, props)
}

export const forgetPasswordService = (props: IforgetPasswordService) => {
    return axiosInstance.post(`user/forgot-password`, props)
}

export const changePasswordService = (props: IchangePasswordService) => {
    return axiosInstance.put(`user/recover-account`, props)
}

export const resendEmailService = (props: IresendEmailService) => {
    return axiosInstance.post(`user/resend-email`, props)
}

export const emailVerifyService = (props: IemailVerifyService) => {
    return axiosInstance.post(`user/email-verification`, props)
}

export const userUpdateService = (props: IuserUpdateService) => {
    return axiosInstance.put(`user`, props)
}

export const getUserService = ({ access_token }: IGetUserService) => {
    return axiosInstance.get(`user`, { headers: { authorization: `Bearer ${access_token}` } })
}

export const retrieveNFTs = (data: IRetrieveNFTs) => {
    const { myProducts, search, body } = data
    const params = new URLSearchParams();
    if (myProducts) {
        params.append("myProducts", myProducts.toString());
    }
    if (data.search) {
        params.append("search", search);
    }
    return axiosInstance.post(`user/retrieve/nfts${params.toString() ? "?" + params.toString() : ""}`, body)
}