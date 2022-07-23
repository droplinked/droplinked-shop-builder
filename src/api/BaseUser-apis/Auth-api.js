import axios from "axios";

import { BASE_URL } from "../BaseUrl";


export const customerSignup = async (info, errorFunc) => {

  try {
    const res = await axios.post(`${BASE_URL}/customer/signup`, info);
    return res.data.data;
  } catch (err) {
    errorFunc(err.response.data.reason);
    return null;
  }
};

export const emailVerify = async (token) => {
  const token = JSON.parse(localStorage.getItem("token"));
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
  const token = JSON.parse(localStorage.getItem("token"));
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
