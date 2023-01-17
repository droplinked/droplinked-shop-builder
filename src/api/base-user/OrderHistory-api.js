import axios from "axios";

import { BASE_URL } from "../BaseUrl";

// export const getImsOrdersHistory = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   try {
//     const res = await axios.get(`${BASE_URL}/order`, {
//       headers: { Authorization: "Bearer " + token },
//     });
//     return res.data.data.orders;
//   } catch (err) {
//     console.log(err.response.data.reason);
//     return null;
//   }
// };
// export const getShopifyOrdersHistory = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   try {
//     const res = await axios.get(`${BASE_URL}/order?shopify=true`, {
//       headers: { Authorization: "Bearer " + token },
//     });
//     return res.data.data.orders;
//   } catch (err) {
//     console.log(err.response.data.reason);
//     return null;
//   }
// };


export const getClientSecret = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await axios.get(`${BASE_URL}/order/${orderId}/client-secret`, {
      headers: { Authorization: "Bearer " + token },
    });
    // return res.data.data;
    return res.data.data.client_secret;
  } catch (err) {
    console.log(err.response.data.reason);
    return null;
  }
};

export const CanselOrder = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await axios.post(`${BASE_URL}/order/${orderId}/cancel-payment`,{}, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

