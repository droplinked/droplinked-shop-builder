import axios from "axios";

import { BASE_URL } from "../BaseUrl";

const token = JSON.parse(localStorage.getItem("token"));

export const getRules = async (errorFunc) => {
  try {
    const res = await axios.get(`${BASE_URL}/producer/ruleset`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.ruleSets;
  } catch (err) {
    errorFunc(err.response.data.reason);
    return null;
  }
};


export const newRule = async (rule) => {
  try {
    const res = await axios.post(`${BASE_URL}/producer/ruleset`,rule,
     {headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.ruleSets;
  } catch (err) {
    errorFunc(err.response.data.reason);
    return null;
  }
};