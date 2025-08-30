import axiosInstance from "lib/axiosConfig"
import { IcitiesService, IcreateAddressService, IupdateAddressService } from "./interfaces"

export const getShopAddressBookService = () => {
    return axiosInstance.get("address-book/shop")
}

export const createAddressService = (props: IcreateAddressService) => {
    return axiosInstance.post(`address-book`, props)
}

export const updateAddressService = ({ addressID, params }: IupdateAddressService) => {
    return axiosInstance.put(`address-book/${addressID}`, params)
}

export const addressByIdService = (addressID: string) => {
    return axiosInstance.get(`address-book/${addressID}`).then(res => res.data)
}

export const allCountriesService = () => {
    return axiosInstance.get(`locations/countries`)
}

export const statesService = (countryName: string) => {
    return axiosInstance.get(`locations/states${countryName ? `?country_name=${countryName}` : ""}`)
}

export const citiesService = ({ state_name, country_name }: IcitiesService) => {
    return axiosInstance.get(`locations/cities?state_name=${state_name}&country_name=${country_name}`)
}