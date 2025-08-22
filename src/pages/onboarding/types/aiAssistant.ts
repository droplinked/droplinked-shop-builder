export interface GenerateWithAiData {
    businessDescribe?: string
    businessCategory?: string
}

export type GenerationState = {
    completedResults: string[]
    finishedRequests: number
    totalRequests: number
}