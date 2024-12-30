import { create } from 'zustand'
import { ProductType } from '../utils/types'

interface ProductPageState {
    selectedProductType: ProductType
    selectedPODProduct: any
    variants: any[]
}

interface State {
    productPageState: ProductPageState
}

interface Action {
    updateProductPageState: <K extends keyof ProductPageState>(key: K, value: ProductPageState[K]) => void
    resetProductPageState: () => void
}

const useProductPageStore = create<State & Action>((set) => ({
    productPageState: {
        selectedProductType: null,
        selectedPODProduct: null,
        variants: []
    },
    updateProductPageState(key, value) {
        set(state => ({
            productPageState: { ...state.productPageState, [key]: value }
        }))
    },
    resetProductPageState() {
        set(() => ({
            productPageState: {
                selectedProductType: null,
                selectedPODProduct: null,
                variants: []
            }
        }))
    }
}))

export default useProductPageStore