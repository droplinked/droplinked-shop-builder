import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));




export const getNotifications = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/notification`,
        {headers: { Authorization: "Bearer " + token },
        })
        return res.data.data.notifications
      } catch (err) {
        console.error(err.response.data.reason)
        return null
      }
};