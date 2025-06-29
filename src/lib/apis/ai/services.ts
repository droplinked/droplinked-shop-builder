import axiosInstance from "../axiosConfig"
import { IAiImageStatusResponse, IGenerateTitleDescription, IGenerateWithAiDirectResponse, IGenerateWithAiRequest, IGenerateWithAiResponse, IImproveDescription, IImproveTitle } from "./interfaces"

export const improveTitle = ({ title, tone }: IImproveTitle) =>
    axiosInstance.post("ai/improve-title", { title, tone })

export const improveDescription = ({ description, tone, title }: IImproveDescription) =>
    axiosInstance.post("ai/improve-description", { description, tone, title })

export const generateTitleDescription = ({ imageUrl }: IGenerateTitleDescription) =>
    axiosInstance.post("/ai/generate-title-description", { imageUrl })

export const generateHeroSection = (params: IGenerateWithAiRequest) =>
    axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-hero-sections", params)

export const generateLogos = (params: IGenerateWithAiRequest) =>
    axiosInstance.post<IGenerateWithAiResponse>("/ai/generate-logos", params)

export const generateShopNames = (params: IGenerateWithAiRequest) =>
    axiosInstance.post<IGenerateWithAiDirectResponse>("/ai/generate-shop-names", params)

export const generateDomains = (params: IGenerateWithAiRequest) =>
    axiosInstance.post<IGenerateWithAiDirectResponse>("/ai/generate-domains", params)

export const getAiImageStatus = (requestId: string) =>
    axiosInstance.get<IAiImageStatusResponse>(`/ai/image-status/${requestId}`)