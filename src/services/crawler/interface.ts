export interface StartWebsiteCrawlingRequest {
    websiteUrl: string
    extractShopInfo?: boolean
}

export interface SelectedProductsForCrawl {
    poolId: string
    selectedUrls: string[]
    shouldRecord: boolean
}

export interface StartWebsiteCrawlingResponse {
    success: boolean
    poolId: string
    message: string
}

export interface RecentCrawlerTasksResponse {
    _id: string
    status: "previews_ready" | "pending" | "processing_preview" | "products_selected" | "crawling" | "completed" | "error" | "recording" | "recorded"
    websiteUrl: string
    previewUrls: string[]
    selectedUrls: string[],
    error: string | null,
    crawlStats: {
        platform: string,
        totalProducts: number,
        newProducts: number,
        updatedProducts: number,
        failedProducts: number,
        timeTaken: number,
    }
    createdAt: string
    updatedAt: string
}

export interface RecordedProduct {
    id: string,
    title: string,
    image: string,
    status: string
}

export interface ShopExtractedDataResponse {
    ready: boolean
    processing: boolean
    data?: {
        shopName: string
        logo?: string
        banner?: string
        description?: string
        extractionMethod?: string
        confidence?: number
    }
    status: string
    message: string
}