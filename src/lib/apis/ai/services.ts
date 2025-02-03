import axiosInstance from "../axiosConfig";
import { IImproveTitle } from "./interfaces";

export const improveTitle = ({ title, tone }: IImproveTitle) => {
    return axiosInstance.post("ai/improve-title", { title, tone })
};
