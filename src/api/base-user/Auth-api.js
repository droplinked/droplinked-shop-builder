import axios from "axios";

import { BASE_URL } from "../BaseUrl";


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
