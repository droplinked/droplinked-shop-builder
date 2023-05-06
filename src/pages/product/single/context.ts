import { IproductState } from "lib/apis/product/interfaces";
import { createContext } from "react";

export interface IpropertiesItems {
    value: string
}

export const initialStatesProduct: IproductState = {
    title: '',
    description: '',
    productCollectionID: '',
    media: [],
    priceUnit: "USD",
    shippingPrice: 0,
    shippingType: "EASY_POST",
    properties: [],
    sku: []
}

interface IproductContext {
    state: IproductState,
    productID: null | string,
    methods: {
        updateState(element: string, value: any): void
        fetch: Function
    },
    loading: boolean
}

export const productContext = createContext<IproductContext>({
    state: initialStatesProduct,
    productID: null,
    methods: {
        updateState: () => { },
        fetch: () => { }
    },
    loading: false,
})