export interface IImproveTitle {
    title: string;
    tone: string;
}
export interface IImproveDescription {
    description: string;
    title?: string;
    tone: string;
}

export interface IGenerateTitleDescription {
    imageUrl: string;
}

export interface IGenerateWithAiRequest {
    prompt: string;
    category: string;
}

// Response for generateHeroSection and generateLogos - only contains requestId
export interface IGenerateWithAiResponse {
    requestId: string;
}

// Old interface for URLs and names that return direct data
export interface IGenerateWithAiDirectResponse {
    heroSections?: string[];
    logos?: string[];
    shopNames?: string[];
    domains?: string[];
    fromCache: boolean;
}

// Response for getAiImageStatus
export interface IAiImageStatusResponse {
    status: "PENDING" | "SUCCESS" | "FAILURE";
    result: string;
    revisedPrompt?: string;
    openaiImageId?: string;
}