


import axios from "axios";

import { BASE_URL } from "../BaseUrl";


const token = JSON.parse(localStorage.getItem("token"));


export const updateShopApi = async (shopinfo) => {
  try {
    const res = await axios.put(`${BASE_URL}/producer/shop/info`, shopinfo, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};