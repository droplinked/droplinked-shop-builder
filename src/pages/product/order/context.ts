import { IcreateAddressService } from "lib/apis/address/interfaces";
import { IcrateSampleServiceSkues } from "lib/apis/order/interfaces";
import { createContext } from "react";

export interface IproductOrderSkues {
    [propname: string]: IcrateSampleServiceSkues
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
}

interface IProps {
    params: IproductOrderStates
    methods: {
        updateState: any
    }
}

export const productOrderStates: IproductOrderStates = {
    address: {} as IcreateAddressService,
    skus: {} as IproductOrderSkues,
    shipmentRates: {} as Array<IshipmentRates>,
    rateId: null
}

const productOrderContext = createContext<IProps>({} as IProps)

export default productOrderContext