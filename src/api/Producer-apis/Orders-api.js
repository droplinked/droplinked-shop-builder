import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));

export const getOrdersList = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/producer/order`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.orders;
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};

export const SeenOrder = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/producer/order/seen/${id}`,{}, {
        headers: { Authorization: "Bearer " + token },
      });
      return true;
    } catch (err) {
      return err.response.data.reason
    }
  };
