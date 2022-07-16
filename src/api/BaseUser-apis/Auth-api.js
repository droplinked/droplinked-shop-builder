import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));







export const emailVerify = async (token) => {
    try {
        const res = await axios.post(`${BASE_URL}/email/verify`, {token: token }
        )
        return true
      } catch (err) {
        return err.response.data.reason;
      }
};