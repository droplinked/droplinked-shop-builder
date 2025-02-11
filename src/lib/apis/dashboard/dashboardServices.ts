import axiosInstance from "../axiosConfig"
import { AnalyticsQueryParams, DashboardPageData, IbestProducts, IClarityData, IgetRevenueServices, PerformanceReportResponse, SalesReportResponse, TopSellersResponse } from "./interfaces"

export const getRevenueServices = ({ dateRange, from, to }: IgetRevenueServices) => {
    return axiosInstance.get(`shop/dashboard/revenue?from=${from.toISOString()}&to=${to.toISOString()}&dateRange=${dateRange}`)
}

export const getBestSelledProducts = ({ from, to }: IbestProducts) => {
    return axiosInstance.get(`shop/dashboard/products?from=${from.toISOString()}&to=${to.toISOString()}&limit=5`)
}

export const getClarityDataService = () => {
    return axiosInstance.get<IClarityData>("clarity/shop-info")
}

export const getDashboardPageData = () =>
    axiosInstance.get<DashboardPageData>("analytics/dashboard").then(res => res.data)

export const getAnalyticsSalesReport = ({ startDate, endData }: AnalyticsQueryParams) =>
    axiosInstance
        .get<SalesReportResponse>(`analytics/sales-report?startDate=${startDate}&endDate=${endData}`)
        .then(res => res.data)

export const getAnalyticsPerformanceReport = ({ startDate, endData }: AnalyticsQueryParams) =>
    axiosInstance
        .get<PerformanceReportResponse>(`analytics/performance-report?startDate=${startDate}&endDate=${endData}`)
        .then(res => res.data)

export const getAnalyticsTopSellers = ({ startDate, endData }: AnalyticsQueryParams) =>
    axiosInstance
        .get<TopSellersResponse>(`analytics/top-sellers?startDate=${startDate}&endDate=${endData}`)
        .then(res => res.data)