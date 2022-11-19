import axios from "axios";

import { BASE_URL } from "../BaseUrl";
import { API_STATUS } from "../../constant/api-status";

export const createCheckout = async(shopdomain , checkout) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
            const res = await axios.post(`${BASE_URL}/producer/shopify/checkout`, 
            {
              shopDomain:shopdomain,
              checkoutItem:checkout
            },
             {
              headers: { Authorization: "Bearer " + token },
            });
            return{status:API_STATUS.SUCCESS ,data: res.data.data};
          } catch (err) {
            return{status:API_STATUS.FAILED, data:err.response.data}
          }
}

