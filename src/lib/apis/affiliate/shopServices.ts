import axiosInstance from "../axiosConfig"
import { IacceptRejectRequestService, IcasperRequestService } from "./interfaces"

export const requestService = ({ chain, params }: IcasperRequestService) => {
    return axiosInstance.post(`affiliate/${chain}/request`, params)
}

export const producerRequestService = () => {
    return axiosInstance.get(`affiliate/producer/requests`)
}

export const acceptRejectRequestService = ({ chain, params }: IacceptRejectRequestService) => {
    return axiosInstance.post(`affiliate/${chain}/request/accept-reject`, params)
}

export const publisherRequestService = () => {
    return axiosInstance.get(`affiliate/publisher/requests`)
}
