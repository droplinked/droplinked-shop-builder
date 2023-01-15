import axios from "axios";

import { BASE_URL } from "../BaseUrl";


// export const getCollectionsByShopname = async (shopname) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/collections/${shopname}`);
//      return res.data.data
//   } catch (err) {
//     console.error(err.response.data.reason);
//     return null;
//   }
// };


export const getCollectionById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/collection/${id}`);
     return res.data.data
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};
