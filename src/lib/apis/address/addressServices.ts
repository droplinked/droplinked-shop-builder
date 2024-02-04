import axiosInstance from "../axiosConfig"
import { IaddressByIdService, IcreateAddressService, IdeleteAddressService, IupdateAddressService } from "./interfaces"

export const addressBookService = () => {
    return axiosInstance.get(`address-book`)
}

export const createAddressService = (props: IcreateAddressService) => {
    return axiosInstance.post(`address-book`, props)
}

export const updateAddressService = ({ addressID, params }: IupdateAddressService) => {
    return axiosInstance.put(`address-book/${addressID}`, params)
}

export const addressByIdService = ({ addressID }: IaddressByIdService) => {
    return axiosInstance.get(`address-book/${addressID}`)
}

export const deleteAddressService = ({ addressID }: IdeleteAddressService) => {
    return axiosInstance.delete(`address-book/${addressID}`)
}