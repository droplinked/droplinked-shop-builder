import { Isku } from "lib/apis/product/interfaces";
import { createContext } from "react";

interface IModalRequestContext {
    product: any
    sku: any
}
export const ModalRequestContext = createContext<IModalRequestContext>({
    product: null,
    sku: null
})