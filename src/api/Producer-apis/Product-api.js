import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));

export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/producer/product`, {
      headers: { Authorization: "Bearer " + token },
    })
    return res.data.data.products
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};
