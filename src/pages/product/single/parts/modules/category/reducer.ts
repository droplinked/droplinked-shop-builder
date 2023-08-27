interface IProduct {
    title: string
    image: string
}

interface ICategory {
    loading?: boolean
    cached?: Array<any>
    id?: string
}

export interface IProductCategoryState {
    product: IProduct
    category: ICategory
}

export type ProductCategoryActions = {
    type: "updateProduct"
    params: IProduct
} | {
    type: "updateCategory"
    params: ICategory
} | {
    type: "reset"
}

namespace ProductCategoryNamespace {

    export const initialState: IProductCategoryState = {
        product: {
            title: null,
            image: null
        },
        category: {
            loading: true,
            cached: [],
            id: null
        }
    }

    export const reducer = (state: IProductCategoryState, action: ProductCategoryActions): IProductCategoryState => {
        switch (action.type) {
            case 'updateProduct':
                return { ...state, product: { ...state.product, ...action.params } }
            case 'updateCategory':
                return { ...state, category: { ...state.category, ...action.params } }
            case "reset":
                return { product: initialState.product, category: { ...state.category, cached: [state.category.cached[0]], id: null } }

            default:
                return state
        }
    }
}

export default ProductCategoryNamespace