import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const getShopInfoByShopname = async (shopname) => {

  try {
    const res = await axios.get(`${BASE_URL}/shopinfo/${shopname}`);
    return res.data.data ;
  } catch (err) {
    // if shop not find return false
    return false
  }
  
};
