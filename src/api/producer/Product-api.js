import axios from "axios";

import { BASE_URL } from "../BaseUrl";



export const getProducts = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/producer/product`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.products;
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};

export const getVariants = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/producer/product/variant`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.variants;
  } catch (err) {
    console.error(err.response.data.reason);
    return null;
  }
};

export const postProduct = async (product) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${BASE_URL}/producer/product`, product, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const deleteSku = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/producer/product/sku/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const addSkuToProduct = async (id, sku) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/product/${id}/sku`,
      { skus: sku },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const updateMerch = async (id, merch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/producer/product/${id}`, merch, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};


export const deleteMerch = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/producer/product/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};


export const updateSku = async (id, sku) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/producer/product/sku/${id}`, sku, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};
