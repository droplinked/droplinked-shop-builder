import axios from "axios";

import { BASE_URL } from "../BaseUrl";



// export const getAddressList = async (errorFunc) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//     try {
//         const res = await axios.get(`${BASE_URL}/address`, {
//           headers: { Authorization: "Bearer " + token },
//         })
//         return res.data.data.addressBooks
//       } catch (err) {
//         errorFunc(err.response.data.reason);
//         return null;
//       }
// };



export const newAddress = async (address) => {
  const token = JSON.parse(localStorage.getItem("token"));
    try {
        const res = await axios.post(`${BASE_URL}/address`, address , {
          headers: { Authorization: "Bearer " + token },
        })
        return true
      } catch (err) {
        return err.response.data.reason;
      }
};


export const DeleteAddress = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
    try {
        const res = await axios.delete(`${BASE_URL}/address/${id}` , {
          headers: { Authorization: "Bearer " + token },
        })
        return true
      } catch (err) {
        return err.response.data.reason;
      }
};


export const UpdateAddress = async (address , id) => {
  const token = JSON.parse(localStorage.getItem("token"));
    try {
        const res = await axios.put(`${BASE_URL}/address/${id}` , address ,{
          headers: { Authorization: "Bearer " + token },
        })
        return true
      } catch (err) {
        return err.response.data.reason;
      }
};