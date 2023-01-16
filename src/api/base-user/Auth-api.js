import axios from "axios";

import { BASE_URL } from "../BaseUrl";
//import { API_STATUS } from "../../constant/api-status";

// export const SignIn = async (info) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/signin`, info);
//     return { status: API_STATUS.SUCCESS, data: res.data.data };
//   } catch (err) {
//     return { status: API_STATUS.FAILED, data: err.response.data.reason };
//   }
// };

// export const customerSignup = async (info, errorFunc) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/customer/signup`, info);
//     return res.data.data;
//   } catch (err) {
//     errorFunc(err.response.data.reason);
//     return null;
//   }
// };

export const emailVerify = async (token) => {
  try {
    const res = await axios.post(`${BASE_URL}/email/verify`, { token: token });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const resetPassword = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/producer/reset-password`, {
      email: email,
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const recoveryAccount = async (token, newPass) => {
  try {
    const res = await axios.post(`${BASE_URL}/producer/account-recovery`, {
      accountRecoveryToken: token,
      newPassword: newPass,
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const signInViaWallet = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin/wallet`, {
      stacksAddress: data.stacksAddress,
      publicKey: data.publicKey,
      signature: data.signature,
      email: data.email,
    });
    //  console.log(res.data);
    return res.data;
  } catch (err) {
    //  console.log(err.response.data);
    return err.response.data.reason;
    // return err.response.data.reason;
  }
};
