import axiosInstance from "../axiosConfig";

export const getChainsFee = () => {
  return axiosInstance.get("/roi/record")
};