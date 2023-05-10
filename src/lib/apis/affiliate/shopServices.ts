import axiosInstance from "../axiosConfig"
import { IcasperRequestService } from "./interfaces"

export const casperRequestService = (props: IcasperRequestService) => {
    return axiosInstance.post(`affiliate/casper/request`, props)
}
