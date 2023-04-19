import { createContext } from "react";

interface IproductState {
    title: string
    description: string
    productCollectionID: string
    media: Array<string>
    shippingPrice: number | string 
    shippingType: "CUSTOM" | "EASY_POST"
}

export const initialStatesProduct: IproductState = {
    title: '',
    description: '',
    productCollectionID: '',
    media: [],
    shippingPrice: '',
    shippingType: "EASY_POST"
}

interface IproductContext {
    state: IproductState
    methods: {
        updateState(element: string, value: any): void
    }
}

export const productContext = createContext<IproductContext>({
    state: initialStatesProduct,
    methods: {
        updateState: () => { }
    }
})