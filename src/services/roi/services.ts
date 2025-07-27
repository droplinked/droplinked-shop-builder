import axiosInstance from "lib/axiosConfig";

export const getChainsFee = () => axiosInstance.get("/roi/record")