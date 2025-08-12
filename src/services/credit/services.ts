import axiosInstance from "lib/axiosConfig"
import {
    IAvailableFilterTypesResponse, ICreditAnalyticsData, IDetailedAnalyticData, IGetCreditAnalytics
    , PdfExportDataResponse
} from "./interfaces"

export const getCreditAnalytics = ({ endDate, startDate }: IGetCreditAnalytics) =>
    axiosInstance.get<{ data: ICreditAnalyticsData }>(`credits/analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)

export const getCreditDetailedAnalytics = ({ endDate, startDate, page, limit, type }: IGetCreditAnalytics) =>
    axiosInstance.get<{ data: IDetailedAnalyticData }>(`credits/transactions/detailed?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`)

export const getAvailableFilterTypes = () =>
    axiosInstance.get<{ data: IAvailableFilterTypesResponse }>(`credits/transaction-types`)

export const downloadCreditChangeInvoice = (transactionId: string) =>
    axiosInstance.get<{ data: PdfExportDataResponse }>(`/credits/credit-transactions/${transactionId}/pdf`).then(res => res.data)