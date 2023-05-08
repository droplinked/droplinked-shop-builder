import { createContext } from "react";

interface IShopProductContext {
    product: any
}
export const ShopProductContext = createContext<IShopProductContext>({
    product: {}
})