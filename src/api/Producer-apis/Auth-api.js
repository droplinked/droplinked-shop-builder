import axios from "axios";

import { BASE_URL } from "../BaseUrl";




export const producerSignup = async(info) => {
  const token = JSON.parse(localStorage.getItem("token"));

    try {
        const res = await axios.post(`${BASE_URL}/producer/signup`,info)
        localStorage.setItem('registerEmail', JSON.stringify(info.email))
        return true
      } catch (err) {
        return err.response.data.reason
      }
}
