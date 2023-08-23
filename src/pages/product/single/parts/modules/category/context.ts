import { createContext } from "react"

export interface IProductCategoryState {
    menu: string
    submenu: string
    product: string
    title: string
    image: string
}

namespace ProductCategoryNamespace {

    interface IContext {
        state: IProductCategoryState
        updateState(key: string, value: string): void
    }

    export const state: IProductCategoryState = {
        menu: null,
        product: null,
        submenu: null,
        title: null,
        image: null
    }

    export const context = createContext<IContext>({
        state,
        updateState: () => { }
    })
}

export default ProductCategoryNamespace