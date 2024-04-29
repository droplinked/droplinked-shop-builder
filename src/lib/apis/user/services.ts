import axiosInstance from "../axiosConfig";
import { IAcceptInvitation, IGetUserService, IInvitation, IRetrieveNFTs, IchangePasswordService, IemailVerifyService, IforgetPasswordService, IresendEmailService, IsignupService, IuserUpdateService } from "./interfaces";

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

export const retrieveNFTs = (props: IRetrieveNFTs) => {
    const { myProducts, search, body } = props
    const params = new URLSearchParams();
    if (myProducts) {
        params.append("myProducts", myProducts.toString());
    }
    if (props.search) {
        params.append("search", search);
    }
    return axiosInstance.post(`user/retrieve/nfts${params.toString() ? "?" + params.toString() : ""}`, body)
}

export const sendInvitaionEmailService = (email: string) => {
    return axiosInstance.post("rbac/invitations", { email })
}

export const getInvitationsService = () => {
    return axiosInstance.get<IInvitation[]>("rbac/invitations")
}

export const acceptInvitationService = (props: IAcceptInvitation) => {
    return axiosInstance.post(`rbac/invitations/${props.invitationId}/accept`, { password: props.password })
}

export const getInvitationDetails = (invitationId: string) => {
    return axiosInstance.post(`rbac/invitations/${invitationId}/info`)
}