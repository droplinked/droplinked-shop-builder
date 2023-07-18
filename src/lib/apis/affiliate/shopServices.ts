import axiosInstance from "../axiosConfig"
import { IacceptRejectRequestService, IcasperRequestService } from "./interfaces"

export const casperRequestService = (props: IcasperRequestService) => {
    return axiosInstance.post(`affiliate/casper/request`, props)
}

export const producerRequestService = () => {
    return axiosInstance.get(`affiliate/producer/requests`)
}

export const acceptRejectRequestService = (params: IacceptRejectRequestService) => {
    return axiosInstance.post(`affiliate/casper/request/accept-reject`, params)
}

export const publisherRequestService = () => {
    return axiosInstance.get(`affiliate/publisher/requests`)
}
