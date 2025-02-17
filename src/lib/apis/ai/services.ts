import axiosInstance from "../axiosConfig";
import { IGenerateTitleDescription, IImproveDescription, IImproveTitle } from "./interfaces";

export const improveTitle = ({ title, tone }: IImproveTitle) => {
    return axiosInstance.post("ai/improve-title", { title, tone })
};

export const improveDescription = ({ description, tone, title }: IImproveDescription) => {
    return axiosInstance.post("ai/improve-description", { description, tone, title })
};

export const generateTitleDescription = ({ imageUrl }: IGenerateTitleDescription) => {
    return axiosInstance.post("/ai/generate-title-description", { imageUrl })
};
