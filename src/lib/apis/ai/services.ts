import axiosInstance from "../axiosConfig";
import { IImproveDescription, IImproveTitle } from "./interfaces";

export const improveTitle = ({ title, tone }: IImproveTitle) => {
    return axiosInstance.post("ai/improve-title", { title, tone })
};

export const improveDescription = ({ description, tone }: IImproveDescription) => {
    return axiosInstance.post("ai/improve-description", { description, tone })
};
