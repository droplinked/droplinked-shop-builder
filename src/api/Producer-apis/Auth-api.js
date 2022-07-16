import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));


export const producerSignup = async(info) => {

    try {
        const res = await axios.post(`${BASE_URL}/producer/signup`,info)
        return true
      } catch (err) {
        return err.response.data.reason
      }
}
