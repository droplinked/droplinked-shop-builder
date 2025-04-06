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

export interface IGenerateWithAiResponse {
    heroSections?: string[];
    logos?: string[];
    shopNames?: string[];
    domains?: string[];
    fromCache: boolean;
}