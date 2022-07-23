import axios from "axios";

import { BASE_URL } from "../BaseUrl";



export const getShop = async () => { 
const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.shop;
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};

export const updateProfileApi = async (profileInfo) => { 
const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/profile`, profileInfo, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
