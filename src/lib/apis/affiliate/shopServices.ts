import axiosInstance from '../axiosConfig'
import {
	IacceptRejectRequestService
} from './interfaces'

export const acceptRejectRequestService = ({ chain, params }: IacceptRejectRequestService) => {
	return axiosInstance.post(`affiliate/${chain}/request/accept-reject`, params)
}