import axiosInstance from "../axiosConfig"
import { ICreditAnalyticsData, IGetCreditAnalytics } from "./interfaces"

export const getCreditAnalytics = ({ endDate, startDate }: IGetCreditAnalytics) => {
    return axiosInstance.get<{ data: ICreditAnalyticsData }>(`shop/credit/analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
}