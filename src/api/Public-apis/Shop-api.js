import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const getShopInfo = async (shopname) => {

  try {
    const res = await axios.get(`${BASE_URL}/shopinfo/${shopname}`);
    return res.data.data ;
  } catch (err) {
    console.error(err.response.data.reason);
    return null
  }
  
};
