import { IcreateAddressService } from "lib/apis/address/interfaces";
import { IcreateSampleServiceSkues } from "lib/apis/order/interfaces";
import { createContext } from "react";
import { number } from "yup";

export interface IproductOrderSkues {
    [propname: string]: IcreateSampleServiceSkues
}

interface IshipmentRates {
    id: string
    title: string
    price: number
    delivery_estimation: string
    selected: boolean
}

interface IproductOrderStates {
    skus: IproductOrderSkues
    address: IcreateAddressService
    shipmentRates: Array<IshipmentRates>
    rateId: string
    orderId: string
    taxAmount: number
}

interface IProps {
    params: IproductOrderStates
    methods: {
        updateState: any,
        resetState: any
    }
}

export const productOrderStates: IproductOrderStates = {
    address: {} as IcreateAddressService,
    skus: {} as IproductOrderSkues,
    shipmentRates: {} as Array<IshipmentRates>,
    rateId: null,
    orderId: null,
    taxAmount: null
}

const productOrderContext = createContext<IProps>({} as IProps)

export default productOrderContext