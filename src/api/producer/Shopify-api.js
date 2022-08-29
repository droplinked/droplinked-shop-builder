import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const createCheckout = async(shopdomain , checkout) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
            const res = await axios.post(`${BASE_URL}/producer/shopify/checkout`, 
            {
              shopName:shopdomain,
              checkoutItem:checkout
            },
             {
              headers: { Authorization: "Bearer " + token },
            });
            return res.data;
          } catch (err) {
            return err.response.data;
          }
}

