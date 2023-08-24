interface ISteps {
    menu?: string
    submenu?: string
}

interface IProduct {
    title: string
    image: string
}

export interface IProductCategoryState {
    steps: ISteps
    product: IProduct
}

export type ProductCategoryActions = {
    type: "updateSteps"
    params: ISteps
} | {
    type: "updateProduct"
    params: IProduct
} | {
    type: "reset"
}

namespace ProductCategoryNamespace {

    export const initialState: IProductCategoryState = {
        steps: {
            menu: null,
            submenu: null,
        },
        product: {
            title: null,
            image: null
        },
    }

    export const reducer = (state: IProductCategoryState, action: ProductCategoryActions): IProductCategoryState => {
        switch (action.type) {
            case 'updateSteps':
                return { ...state, steps: { ...state.steps, ...action.params } }
            case 'updateProduct':
                return { ...state, product: { ...state.product, ...action.params } }
            case "reset":
                return initialState

            default:
                return state
        }
    }
}

export default ProductCategoryNamespace