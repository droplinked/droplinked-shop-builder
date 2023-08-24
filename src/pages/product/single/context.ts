import { IproductState } from "lib/apis/product/interfaces";
import { createContext } from "react";
import ProductPageNamespace, { productActions } from "./reducers";


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
        dispatch(action: productActions): void
    },
    loading: boolean,
    sync: boolean,
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
        setSync: () => { },
        dispatch: null
    },
    loading: false,
    sync: false,
})