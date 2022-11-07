import axios from "axios";

import { BASE_URL } from "../BaseUrl";

export const getRules = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/producer/ruleset`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const getRuleById = async (ruleId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(`${BASE_URL}/producer/ruleset/${ruleId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const addRuleset = async (collectionID, rules , webUrl , gated) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${BASE_URL}/producer/ruleset`,
      {
        collectionID: collectionID,
        gated: gated,
        rules: rules,
        webUrl:webUrl
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const newRule = async (rule) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${BASE_URL}/producer/ruleset`, rule, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const deleteRule = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.delete(`${BASE_URL}/producer/ruleset/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};

export const updateRule = async (id, rule , webUrl) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${BASE_URL}/producer/ruleset/${id}`,
    {
      rules: rule,
      webUrl :webUrl
    }, {
      headers: { Authorization: "Bearer " + token },
    });
    return true;
  } catch (err) {
    return err.response.data.reason;
  }
};
