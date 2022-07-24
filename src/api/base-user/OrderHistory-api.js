import axios from "axios";

import { BASE_URL } from "../BaseUrl";



export const getOrdersHistory = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/order`,
    {headers: { Authorization: "Bearer " + token }});
    return res.data.data.orders;
  } catch (err) {
    console.log(err.response.data.reason);
    return null;
  }
};
