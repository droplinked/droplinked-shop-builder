import axiosInstance from "lib/axiosConfig";
import { removeFalsyValues } from "utils/helpers";
import {
    IAcceptInvitation,
    IDemoRequest,
    IGetUserService,
    IInvitation,
    IPostUserVerifyPartner,
    ISubscribeFeature,
    IchangePasswordService,
    IresendEmailService,
    IuserUpdateService,
    VerifyEmailPayload,
} from "./interfaces";

export const changePasswordService = (props: IchangePasswordService) => {
    return axiosInstance.put(`user/recover-account`, props);
};

export const resendEmailService = (props: IresendEmailService) => {
    return axiosInstance.post(`user/resend-email`, props);
};

export const verifyEmailCode = (payload: VerifyEmailPayload) => {
    return axiosInstance.post(`user/verify-email-code`, payload);
};

export const userUpdateService = (props: IuserUpdateService) => {
    return axiosInstance.put(`user`, props);
};

export const getUserService = ({ access_token }: IGetUserService) => {
    return axiosInstance.get(`user`, { headers: { authorization: `Bearer ${access_token}` } });
};

export const sendInvitaionEmailService = (email: string) => {
    return axiosInstance.post("rbac/invitations", { email });
};

export const getInvitationsService = () => {
    return axiosInstance.get<IInvitation[]>("rbac/invitations");
};

export const acceptInvitationService = (props: IAcceptInvitation) => {
    return axiosInstance.post(`rbac/invitations/${props.invitationId}/accept`, { password: props.password });
};

export const getInvitationDetails = (invitationId: string) => {
    return axiosInstance.post(`rbac/invitations/${invitationId}/info`);
};

export const postUserVerifyD3 = (props: IPostUserVerifyPartner) => {
    return axiosInstance.post(`user/d3/verify`, props);
}

export const postUserVerifyUD = (props: IPostUserVerifyPartner) => {
    return axiosInstance.post(`user/ud/verify`, props);
}

export const subscribeFeature = (subscribeData: ISubscribeFeature) => {
    return axiosInstance.post("/user/add/email/landing", subscribeData);
}

export const postDemoRequestService = (payload: IDemoRequest) => {
    return axiosInstance.post("/user-features/demo-request", removeFalsyValues(payload));
};
