


import axios from "axios";

import { BASE_URL } from "../BaseUrl";





export const updateShopApi = async (shopinfo) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/producer/shop/info`, shopinfo, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};



export const setImsType = async (imsType) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${BASE_URL}/producer/profile/ims`, 
    { type: imsType }
    , {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response;
  }
};