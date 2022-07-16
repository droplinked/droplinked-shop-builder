import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));



export const customerSignup = async(info , errorFunc) => {

  try {
      const res = await axios.post(`${BASE_URL}/customer/signup`,info)
      return res.data.data
    } catch (err) {
      errorFunc(err.response.data.reason)
      return null 
    }
}




export const emailVerify = async (token) => {
    try {
        const res = await axios.post(`${BASE_URL}/email/verify`, {token: token }
        )
        return true
      } catch (err) {
        return err.response.data.reason;
      }
};