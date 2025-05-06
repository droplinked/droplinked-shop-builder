import axiosInstance from "../axiosConfig"
import { SelectedProductsForCrawl } from "./interface"

export const getProductsWithUrl = (storeUrl: string) => {
    return axiosInstance.get(`/crawlers/product-urls-preview?storeUrl=${storeUrl}`)
}

export const CrawlSelectedProducts = (params: SelectedProductsForCrawl) => {
    return axiosInstance.post(`/crawlers/crawl-selected`, params)
}