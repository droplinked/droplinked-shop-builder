import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const getShippingRate = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const checkoutObj = JSON.parse(localStorage.getItem("checkout_id"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/shopify/checkout/getshippingrates`,
      {
        shopName: checkoutObj.shopName,
        checkoutId: checkoutObj.checkoutId,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateCheckout = async (shopname, checkoutId, handle) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // const checkoutObj = JSON.parse(localStorage.getItem("checkout_id"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/shopify/checkout/update`,
      {
        shopName: shopname,
        checkoutId: checkoutId,
        checkoutItem: {
          checkout: {
            token: checkoutId,
            shipping_line: {
              handle: handle,
            },
          },
        },
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const confirmPayment = async (
  shopname,
  checkoutId,
  sessionId,
) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/shopify/payment`,
      {
        shopDomain: shopname,
        checkoutId: checkoutId,
        session_id: sessionId,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return true;
  } catch (err) {
    return err.response.status
  }
};

export const creatShopifySession = async (card) => {
  try {
    const res = await axios.post(
      `https://elb.deposit.shopifycs.com/sessions`,
      {
        credit_card: {
          number: card.number,
          first_name: card.first_name,
          last_name: card.last_name,
          month: card.month,
          year: card.year,
          verification_value: card.verification_value,
        },
      },
    );
    return {status: 'success' , data : res.data.id};
  } catch (err) {
    console.log(err)
    if(err.response != undefined) return {status: 'error' , data : (err.response.message)}
    else return {status: 'error' , data : "Failed"}
  }
};
