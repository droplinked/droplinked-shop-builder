import axiosInstance from "../axiosConfig";
import { IPostNewVariantName } from "./interfaces";

export const variantOptionsService = () => axiosInstance.get("variant-options");

export const postNewVariantName = (body: IPostNewVariantName) => axiosInstance.post("variant/custom", body);
