import axios from "axios";

import { BASE_URL } from "../BaseUrl";


export const resendEmail = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/email/resend`,{ email: email });
     return true
  } catch (err) {
    return false
  }
};


