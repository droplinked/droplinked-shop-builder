import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const getCart = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: "Bearer " + token },
    });
   // return res.data.data.cart;
   return res.data;
  } catch (err) {
    return err.response
  }
};

export const addCheckoutAddress = async (addressId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/cart/checkout-address`,
      { addressBookID: addressId },
      { headers: { Authorization: "Bearer " + token } }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const addSkuToCart = async (cart) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${BASE_URL}/cart/sku`, cart, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const deleteSkuFromCart = async (skuId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/cart/sku/${skuId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const updateQuantity = async (skuId, q) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(
      `${BASE_URL}/cart/sku/${skuId}`,
      { quantity: parseInt(q) },
      { headers: { Authorization: "Bearer " + token } }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const checkoutCart = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/cart/checkout`,
      {},
      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data.data.client_secret;
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};


export const addRootpaymentOrder = (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    axios.post(
      `${BASE_URL}/cart/root-payments-order-id`,
      { orderID: orderId },
      { headers: { Authorization: "Bearer " + token } }
    );
    console.log();
  } catch (err) {
    console.log();
  }
};

export const removeCart = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/cart`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};
