import { createContext } from "react";

interface IshopsContainerContext {
    shop: any
}
export const shopsContainerContext = createContext<IshopsContainerContext>({
    shop: {}
})