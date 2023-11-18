import { createContext } from "react";

interface IShopProductContext {
    product: any
    shop: any
    states: {
        slider: string
    }
    updateState(key, value): void
}
export const ShopProductContext = createContext<IShopProductContext>({
    product: {},
    shop: {},
    states: {
        slider: null
    },
    updateState: () => { }
})