import axiosInstance from '../axiosConfig'
import {
	ISolanaRequestService,
	IacceptRejectRequestService,
	IcasperRequestService,
	IproducerRequestService,
	IpublisherRequestService,
} from './interfaces'

export const requestService = ({
	chain,
	params,
}: IcasperRequestService | ISolanaRequestService) => {
	return axiosInstance.post(`affiliate/${chain}/request`, params)
}

export const producerRequestService = ({ page }: IproducerRequestService) => {
	return axiosInstance.get(`affiliate/producer/requests?page=${page}&limit=10`)
}

export const acceptRejectRequestService = ({ chain, params }: IacceptRejectRequestService) => {
	return axiosInstance.post(`affiliate/${chain}/request/accept-reject`, params)
}

export const publisherRequestService = ({ page }: IpublisherRequestService) => {
	return axiosInstance.get(`affiliate/publisher/requests?page=${page}&limit=10`)
}
