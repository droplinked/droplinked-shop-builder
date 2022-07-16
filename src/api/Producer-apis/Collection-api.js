import axios from "axios";

import { BASE_URL } from "../BaseUrl";
//import { useToasty } from "../../context/toastify/ToastContext"

const token = JSON.parse(localStorage.getItem("token"));

export const getCollections = async() => {
//  const { errorToast } = useToasty()

    try {
        const res = await axios.get(`${BASE_URL}/producer/collection?withProducts=true`, {
          headers: { Authorization: "Bearer " + token },
        });
        return res.data.data.collections;
      } catch (err) {
        console.log(err.response.data.reason);
        return null;
      }
}

//delete collection
export const deleteCollection = async(id) => {

      try {
          const res = await axios.delete(`${BASE_URL}/producer/collection/${id}`, {
            headers: { Authorization: "Bearer " + token },
          });
          return true;
        } catch (err) {
          return err.response.data.reason
        }
  }