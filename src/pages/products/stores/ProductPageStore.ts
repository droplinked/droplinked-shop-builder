import { create } from 'zustand'

interface ProductPageState {
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
                selectedPODProduct: null,
                variants: []
            }
        }))
    }
}))

export default useProductPageStore