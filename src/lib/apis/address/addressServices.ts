import axios from "axios"
import axiosInstance from "../axiosConfig"
import { IaddressByIdService, IcitiesService, IcreateAddressService, IdeleteAddressService, IsatatesService, IupdateAddressService } from "./interfaces"

export const addressBookService = () => {
    return axiosInstance.get(`address-book`)
}

export const getShopAddressBookService = () => {
    return axiosInstance.get("address-book/shop")
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

export const allCountriesService = () => {
    return axiosInstance.get(`locations/countries`)
}

export const statesService = ({ country_name }: IsatatesService) => {
    return axiosInstance.get(`locations/states${country_name ? `?country_name=${country_name}` : ""}`)
}

export const citiesService = ({ state_name, country_name }: IcitiesService) => {
    return axiosInstance.get(`locations/cities?state_name=${state_name}&country_name=${country_name}`)
}