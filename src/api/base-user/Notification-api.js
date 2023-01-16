// import axios from "axios";

// import { BASE_URL } from "../BaseUrl";



// // export const getNotifications = async () => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //     try {
// //         const res = await axios.get(`${BASE_URL}/notification`,
// //         {headers: { Authorization: "Bearer " + token },
// //         })
// //         return res.data.data.notifications
// //       } catch (err) {
// //         console.error(err.response.data.reason)
// //         return null
// //       }
// // };



// // export const seenNotification = async (id) => {
// //   const token = JSON.parse(localStorage.getItem("token"));
// //   try {
// //       const res = await axios.post(`${BASE_URL}/notification/seen/${id}`,{},
// //       {headers: { Authorization: "Bearer " + token },
// //       })
// //       return true
// //     } catch (err) {
// //       return err.response.data.reason
// //     }
// // };