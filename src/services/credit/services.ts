import axiosInstance from "lib/axiosConfig"
import { IAvailableFilterTypesResponse, ICreditAnalyticsData, IDetailedAnalyticData, IGetCreditAnalytics } from "./interfaces"

export const getCreditAnalytics = ({ endDate, startDate }: IGetCreditAnalytics) => {
    return axiosInstance.get<{ data: ICreditAnalyticsData }>(`shop/credit/analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
}
export const getCreditDetailedAnalytics = ({ endDate, startDate, page, limit, type }: IGetCreditAnalytics) => {
    return axiosInstance.get<{ data: IDetailedAnalyticData }>(`shop/credit/transactions/detailed?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`)
}
export const getAvailableFilterTypes = () => {
    return axiosInstance.get<{ data: IAvailableFilterTypesResponse }>(`shop/credit/transaction-types`)
}