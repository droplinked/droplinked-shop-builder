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
    product_type: "NORMAL",
    publish_product: true,
    shippingType: "EASY_POST",
    properties: [],
    sku: [],
    prodviderID: "DLW",
    pod_blank_product_id: null,
    artwork: null,
    artwork2: null,
    m2m_positions: [],
    artwork_position: "FRONT_CENTER",
    artwork2_position: "BACK_CENTER",
    thumb: ""
}

export interface IproductStore {
    variants: any
}

interface IproductContext {
    state: IproductState,
    store: {
        state: IproductStore
        methods: {
            update(storeName: any, data: any): void
        }
    }
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
    store: {
        state: {
            variants: []
        },
        methods: {
            update: () => { }
        }
    },
    methods: {
        updateState: () => { },
        fetch: () => { }
    },
    loading: false,
})