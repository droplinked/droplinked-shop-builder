import axios from "axios";

import { BASE_URL } from "../BaseUrl";



export const getRules = async (errorFunc) => {
  const token = JSON.parse(localStorage.getItem("token"));
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
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${BASE_URL}/producer/ruleset`,rule,
     {headers: { Authorization: "Bearer " + token },
    });
    return res.data.data.ruleSets;
  } catch (err) {
    return null;
  }
};



export const deleteRule = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/producer/ruleset/${id}`,
     {headers: { Authorization: "Bearer " + token },
    });
    return true
  } catch (err) {
    return err.response.data.reason;
  }
};



export const updateRule = async (id , rule) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/producer/ruleset/${id}`,rule,
     {headers: { Authorization: "Bearer " + token },
    });
    return true
  } catch (err) {
    return err.response.data.reason;
  }
};