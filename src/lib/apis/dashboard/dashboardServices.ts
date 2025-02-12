import axiosInstance from "../axiosConfig"
import { AnalyticsQueryParams, DashboardPageData, IbestProducts, IClarityData, IgetRevenueServices, PerformanceReportResponse, SalesReportResponse, TopSeller } from "./interfaces"

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

export const getAnalyticsSalesReport = ({ startDate, endDate }: AnalyticsQueryParams) =>
    axiosInstance
        .get<SalesReportResponse>(`analytics/sales-report?startDate=${startDate}&endDate=${endDate}`)
        .then(res => res.data)

export const getAnalyticsPerformanceReport = ({ startDate, endDate }: AnalyticsQueryParams) =>
    axiosInstance
        .get<PerformanceReportResponse>(`analytics/performance-report?startDate=${startDate}&endDate=${endDate}`)
        .then(res => res.data)

export const getAnalyticsTopSellers = ({ startDate, endDate }: AnalyticsQueryParams) =>
    axiosInstance
        .get<TopSeller[]>(`analytics/top-sellers?startDate=${startDate}&endDate=${endDate}`)
        .then(res => res.data)