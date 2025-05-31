import axiosInstance from "lib/axiosConfig"
import { IAvailableFilterTypesResponse, ICreditAnalyticsData, IDetailedAnalyticData, IGetCreditAnalytics } from "./interfaces"

export const getCreditAnalytics = ({ endDate, startDate }: IGetCreditAnalytics) =>
    axiosInstance.get<{ data: ICreditAnalyticsData }>(`shop/credit/analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)

export const getCreditDetailedAnalytics = ({ endDate, startDate, page, limit, type }: IGetCreditAnalytics) =>
    axiosInstance.get<{ data: IDetailedAnalyticData }>(`shop/credit/transactions/detailed?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`)

export const getAvailableFilterTypes = () =>
    axiosInstance.get<{ data: IAvailableFilterTypesResponse }>(`shop/credit/transaction-types`)

export const downloadCreditChangeInvoice = (transactionId: string) =>
    axiosInstance.get(`shop/credit-transactions/${transactionId}/pdf`, { responseType: 'blob' }).then(res => res.data)