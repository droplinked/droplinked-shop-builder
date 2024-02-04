import { createContext } from "react";

interface IShopProductContext {
    product: any
    shop: any
}
export const ShopProductContext = createContext<IShopProductContext>({
    product: {},
    shop: {}
})