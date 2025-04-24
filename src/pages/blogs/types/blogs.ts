export interface Blog {
    id: string
    title: string
    body: string
    searchEngineSummary: string
    category: string
    keywords: string
    featuredPicture: File | null
    isVisible: boolean
    isFeatured: boolean
    isPinnedToHeader: boolean
    isAiSummaryEnabled: boolean
    areCommentsEnabled: boolean
}