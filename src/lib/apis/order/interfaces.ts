import { IcreateAddressService } from "../address/interfaces"

export interface IgetOrderService {
    orderID: string
}

export interface IcrateSampleServiceSkues {
    _id: string
    quantity: number
}

export interface IcrateSampleService {
    skus: IcrateSampleServiceSkues[]
    address: IcreateAddressService
}