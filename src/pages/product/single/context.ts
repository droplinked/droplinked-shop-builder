import { IproductState } from "lib/apis/product/interfaces";
import { createContext } from "react";
import ProductPageNamespace from "./reducers";


export interface IpropertiesItems {
    value: string
}

interface IproductContext {
    state: IproductState,
    store: {
        state: ProductPageNamespace.IproductStore
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
    state: ProductPageNamespace.initialState.params,
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