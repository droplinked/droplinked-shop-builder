import axios from "axios";

import { BASE_URL } from "../BaseUrl";
//import { useToasty } from "../../context/toastify/ToastContext"

export const getCollections = async () => {
  //  const { errorToast } = useToasty()
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(
      `${BASE_URL}/producer/collection?withProducts=true`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data.data.collections;
  } catch (err) {
    console.log(err.response.data.reason);
    return null;
  }
};

//update collection
export const updateCollection = async (id, newObj) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(
      `${BASE_URL}/producer/collection/${id}`,
      newObj,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

// add new collection
export const newCollection = async (newCollection) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/collection`,
      newCollection,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

//delete collection
export const deleteCollection = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/producer/collection/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const addProductToCollection = async (collectionId, productId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/collection/${collectionId}/product`,
      {
        productID: productId,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};
