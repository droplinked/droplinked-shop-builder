import axios from "axios";

export const getCountries = async (shopname) => {
  try {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    return res.data;
  } catch (err) {
    return false;
  }
};
