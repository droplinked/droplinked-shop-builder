// import axios from "axios";

// import { BASE_URL } from "../BaseUrl";
// import { API_STATUS } from "../../constant/api-status";
// //import { useToasty } from "../../context/toastify/ToastContext"

// // export const getAllCollections = async () => {
// //   //  const { errorToast } = useToasty()
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.get(
// //       `${BASE_URL}/producer/collection`,
// //       {
// //         headers: { Authorization: "Bearer " + token },
// //       }
// //     );
// //     return {status:API_STATUS.SUCCESS ,data: res.data.data.collections};
// //   } catch (err) {
// //     return {status:API_STATUS.FAILED, data:err.response.data.reason}
// //   }
// // };

// // export const getCollections = async () => {
// //   //  const { errorToast } = useToasty()
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.get(
// //       `${BASE_URL}/producer/collection?withProducts=true`,
// //       {
// //         headers: { Authorization: "Bearer " + token },
// //       }
// //     );
// //     return {status:API_STATUS.SUCCESS ,data: res.data.data.collections};
// //   } catch (err) {
// //     return {status:API_STATUS.FAILED, data:err.response.data.reason}
// //   }
// // };

// //update collection
// // export const updateCollection = async (id, title) => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.put(
// //       `${BASE_URL}/producer/collection/${id}`,
// //       { title: title },
// //       {
// //         headers: { Authorization: "Bearer " + token },
// //       }
// //     );
// //     return true;
// //   } catch (err) {
// //     return err.response.data.reason;
// //   }
// // };

// // add new collection
// // export const newCollection = async (title) => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.post(
// //       `${BASE_URL}/producer/collection`,
// //       { title: title },
// //       {
// //         headers: { Authorization: "Bearer " + token },
// //       }
// //     );
// //     return true;
// //   } catch (err) {
// //     return err.response.data.reason;
// //   }
// // };

// //delete collection
// // export const deleteCollection = async (id) => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.delete(`${BASE_URL}/producer/collection/${id}`, {
// //       headers: { Authorization: "Bearer " + token },
// //     });
// //     return true;
// //   } catch (err) {
// //     return err.response.data.reason;
// //   }
// // };

// // export const addProductToCollection = async (collectionId, productId) => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //     const res = await axios.post(
// //       `${BASE_URL}/producer/collection/${collectionId}/product`,
// //       {
// //         productID: productId,
// //       },
// //       {
// //         headers: { Authorization: "Bearer " + token },
// //       }
// //     );
// //     return true;
// //   } catch (err) {
// //     return err.response.data.reason;
// //   }
// // };
