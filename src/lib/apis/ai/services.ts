import axiosInstance from "../axiosConfig";
import { IImproveDescription, IImproveTitle } from "./interfaces";

export const improveTitle = ({ title, tone }: IImproveTitle) => {
    return axiosInstance.post("ai/improve-title", { title, tone })
};

export const improveDescription = ({ description, tone, title }: IImproveDescription) => {
    return axiosInstance.post("ai/improve-description", { description, tone, title })
};
