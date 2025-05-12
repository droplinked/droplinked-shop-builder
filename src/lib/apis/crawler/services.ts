import axiosInstance from "../axiosConfig"
import { RecentCrawlerTasksResponse, SelectedProductsForCrawl, StartWebsiteCrawlingResponse } from "./interface"

export const startWebsiteCrawling = (websiteUrl: string) => {
    return axiosInstance.post<StartWebsiteCrawlingResponse>(`/crawler/website`, { websiteUrl })
}

export const getRecentCrawlerTasks = () => {
    return axiosInstance.get<RecentCrawlerTasksResponse[]>(`/crawler/tasks/recent?limit=10`)
}

export const getProductsWithPoolId = (poolId: string) => {
    return axiosInstance.get(`/crawler/preview-urls/${poolId}`)
}

export const CrawlSelectedProducts = (params: SelectedProductsForCrawl) => {
    return axiosInstance.post(`/crawler/selected-products`, params)
}