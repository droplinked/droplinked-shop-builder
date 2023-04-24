import { createApiReq } from "./api-utils";

export const postLoginByEmail = (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  return createApiReq(`auth/login`, false, body);
};

export const postLoginByWallet = (body: any) => {
  return createApiReq(`auth/wallet`, false, body);
};
