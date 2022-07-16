import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));




export const addCheckoutAddress = async (addressId) => {
    try {
        const res = await axios.get(`${BASE_URL}/cart/checkout-address`,
          { addressBookID: addressId } ,
          {headers: { Authorization: "Bearer " + token },
        })
        return true
      } catch (err) {
        return err.response.data.reason
      }
};


export const deleteSkuFromCart = async (skuId) => {
  try {
      const res = await axios.delete(`${BASE_URL}/cart/sku/${skuId}`,{
        headers: { Authorization: "Bearer " + token },
      })
      return true
    } catch (err) {
      return err.response.data.reason
    }
};



export const updateQuantity = async (skuId , q) => {
  try {
      const res = await axios.put(`${BASE_URL}/cart/sku/${skuId}`,
      { quantity: parseInt(q) },
      {headers: { Authorization: "Bearer " + token },
      })
      return true
    } catch (err) {
      return err.response.data.reason
    }
};




