import axiosInstance from '../axiosConfig'
import { IRecordBatchCasperService, IRecordCasperService } from './interfaces'

export const supportedChainsService = () =>
	axiosInstance.get(`sku/record/supported-chains`)

export const recordCasperService = ({ chain, params }: IRecordCasperService) =>
	axiosInstance.post(`sku/record/${chain}`, params)

export const recordBatchCasperService = ({ chain, params }: IRecordBatchCasperService) =>
	axiosInstance.post(`sku/record-all/${chain}`, params)