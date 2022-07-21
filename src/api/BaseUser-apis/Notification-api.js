import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));



export const getNotifications = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/notification`,
        {headers: { Authorization: "Bearer " + token },
        })
        return res.data.data.notifications.filter(notification => notification.seen == false)
      } catch (err) {
        console.error(err.response.data.reason)
        return null
      }
};



export const seenNotification = async (id) => {
  try {
      const res = await axios.post(`${BASE_URL}/notification/seen/${id}`,{},
      {headers: { Authorization: "Bearer " + token },
      })
      return true
    } catch (err) {
      return err.response.data.reason
    }
};