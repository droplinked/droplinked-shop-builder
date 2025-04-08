import axiosInstance from "../axiosConfig";
import { IGenerateTitleDescription, IGenerateWithAiRequest, IGenerateWithAiResponse, IImproveDescription, IImproveTitle } from "./interfaces";

export const improveTitle = ({ title, tone }: IImproveTitle) => {
    return axiosInstance.post("ai/improve-title", { title, tone })
};

export const improveDescription = ({ description, tone, title }: IImproveDescription) => {
    return axiosInstance.post("ai/improve-description", { description, tone, title })
};

export const generateTitleDescription = ({ imageUrl }: IGenerateTitleDescription) => {
    return axiosInstance.post("/ai/generate-title-description", { imageUrl })
};

export const generateHeroSection = (params: IGenerateWithAiRequest) => {
    return axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-hero-sections", params)
};

export const generateLogos = (params: IGenerateWithAiRequest) => {
    return axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-logos", params)
};

export const generateShopNames = (params: IGenerateWithAiRequest) => {
    return axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-shop-names", params)
};

export const generateDomains = (params: IGenerateWithAiRequest) => {
    return axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-domains", params)
};