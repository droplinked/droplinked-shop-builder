import axiosInstance from 'lib/axiosConfig';
import {
  RecentCrawlerTasksResponse,
  RecordedProduct,
  SelectedProductsForCrawl,
  ShopExtractedDataResponse,
  StartWebsiteCrawlingRequest,
  StartWebsiteCrawlingResponse
} from './interface';

export const startWebsiteCrawling = (params: StartWebsiteCrawlingRequest) => {
  return axiosInstance.post<StartWebsiteCrawlingResponse>(`/crawler/website`, params);
};

export const getRecentCrawlerTasks = () => {
  return axiosInstance.get<RecentCrawlerTasksResponse[]>(`/crawler/tasks/recent?limit=10`);
};

export const getProductsWithPoolId = (poolId: string) => {
  return axiosInstance.get(`/crawler/preview-urls/${poolId}`);
};

export const CrawlSelectedProducts = (params: SelectedProductsForCrawl) => {
  return axiosInstance.post(`/crawler/selected-products`, params);
};

export const getRecordedProducts = () => {
  return axiosInstance.get<RecordedProduct[]>('/crawler/recorded-products');
};

export const initiateNftCliming = (receiverAddress: string) => {
  return axiosInstance.post('/crawler/claim-nfts', { receiverAddress });
};

export const getShopExtractedData = (poolId: string) => {
  return axiosInstance.get<ShopExtractedDataResponse>(`/crawler/shop-info/${poolId}`);
};
