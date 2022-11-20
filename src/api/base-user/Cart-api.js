import axios from "axios";

import { BASE_URL } from "../BaseUrl";
import { API_STATUS } from "../../constant/api-status";

export const getCart = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: "Bearer " + token },
    });
    return { status: API_STATUS.SUCCESS, data: res.data.data.cart };
  } catch (err) {
    return { status: API_STATUS.FAILED, data: err.response.data.reason };
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
    return { status: API_STATUS.SUCCESS, data: res.data };
  } catch (err) {
    return { status: API_STATUS.FAILED, data: err.response.data.reason };
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

export const checkoutCart = async (walletAddress) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/cart/checkout`,
      { wallet: walletAddress },
      { headers: { Authorization: "Bearer " + token } }
    );
    return { status: "success", data: res.data.data.client_secret };
  } catch (err) {
    return { status: "failed", data: err.response.data.reason };
  }
};

export const checkoutFree = async (walletAddress) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/cart/checkout-free`,
      { wallet: walletAddress },
      { headers: { Authorization: "Bearer " + token } }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const addRootpaymentOrder = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = axios.post(
      `${BASE_URL}/cart/root-payments-order-id`,
      { orderID: orderId },
      { headers: { Authorization: "Bearer " + token } }
    );
  } catch (err) {}
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

export const getEasypostShipping = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/cart/shipping-rate`, {
      headers: { Authorization: "Bearer " + token },
    });
    return { status: API_STATUS.SUCCESS, data: res.data.data };
  } catch (err) {
    return { status: API_STATUS.FAILED, data: err.response.data.reason };
  }
};

export const setEasypostShpping = async (shippingRate) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/cart/shipping-rate`,
      { rateID: shippingRate },
      { headers: { Authorization: "Bearer " + token } }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};
