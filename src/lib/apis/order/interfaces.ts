import { IcreateAddressService } from "../address/interfaces"

export interface IgetOrderService {
    orderID: string
}

export interface IcreateSampleServiceSkues {
    _id: string
    quantity: number
}

export interface IcrateSampleService {
    skus: IcreateSampleServiceSkues[]
    address: IcreateAddressService
}

export interface IupdateSampleService {
    rateId: string
}