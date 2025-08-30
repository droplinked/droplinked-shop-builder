export interface IcreateAddressService {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2: string
    country: string
    city: string
    state: string
    zip: string
    addressType: string
}

export interface IupdateAddressService {
    addressID: string
    params: IcreateAddressService
}

export interface IcitiesService {
    state_name: string
    country_name: string
}