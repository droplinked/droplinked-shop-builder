import axiosInstance from "../axiosConfig"
import { AnalyticsQueryParams, DashboardPageData, PerformanceReportResponse, SalesReportResponse, TopSeller } from "./interfaces"

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