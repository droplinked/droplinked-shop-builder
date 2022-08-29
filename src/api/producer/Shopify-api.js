import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const createCheckout = ({checkuotObj}) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
            const res = await axios.post(`${BASE_URL}/producer/shopify/checkout`, 
            checkuotObj
            , {
              headers: { Authorization: "Bearer " + token },
            });
            return true;
          } catch (err) {
            return err.response;
          }
}

