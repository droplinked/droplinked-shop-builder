import axios from "axios";

import { BASE_URL } from "../BaseUrl";


export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/product/${id}`);
     return res.data.data
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};


