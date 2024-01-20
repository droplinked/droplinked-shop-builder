import { createContext } from "react"
import ProductCategoryNamespace, { IProductCategoryState, ProductCategoryActions } from "./reducer"

interface IContext {
    state: IProductCategoryState
    dispatch(action: ProductCategoryActions): void
}

export const productCategoryContext = createContext<IContext>({
    state: ProductCategoryNamespace.initialState,
    dispatch: null
})

export default productCategoryContext