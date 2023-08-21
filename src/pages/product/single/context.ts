import { IproductState } from "lib/apis/product/interfaces";
import { createContext } from "react";
import ProductPageNamespace from "./reducers";


export interface IpropertiesItems {
    value: string
}

interface IproductContext {
    state: IproductState,
    store: {
        state: ProductPageNamespace.IStore
        methods: {
            update(storeName: any, data: any): void
        }
    }
    productID: null | string,
    methods: {
        updateState(element: string, value: any): void
        fetch: Function
        setSync(value: boolean): void
    },
    loading: boolean,
    sync: boolean
}


export const productContext = createContext<IproductContext>({
    state: ProductPageNamespace.initialState.params,
    productID: null,
    store: {
        state: {
            variants: [],
            available_variant: [],
            print_positions: [],
            product_types: []
        },
        methods: {
            update: () => { }
        }
    },
    methods: {
        updateState: () => { },
        fetch: () => { },
        setLoading: () => { }
    },
    loading: false,
    sync: false
})