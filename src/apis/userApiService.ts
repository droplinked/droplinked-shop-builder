import { createApiReq } from "./api-utils";
export const getUser = () => {
  return createApiReq(`user`, true, null);
};

export const putUser = (body: any) => {
  return createApiReq(`user`, true, body);
};

export const postUserSignup = (
  email: string,
  password: string,
  shopName: string
) => {
  const body = {
    email: email,
    password: password,
    shopName: shopName,
  };

  return createApiReq(`user/signup`, false, body);
};

export const postUserForgotPassword = (body: any) => {
  return createApiReq(`user/forgot-password`, false, body);
};

export const postUserResendEmail = (email: string) => {
  return createApiReq(`user/resend-email`, false, { email: email });
};

export const postUserEmailVerification = (token: string) => {
  return createApiReq(`user/email-verification`, false, { token: token });
};

export const putUserRecoveryAccount = (body: any) => {
  return createApiReq(`user/recover-account`, false, body);
};
