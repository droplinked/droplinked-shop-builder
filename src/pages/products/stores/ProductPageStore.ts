import { create } from 'zustand'
import { ProductType } from '../utils/types'

interface State {
    selectedProductType: ProductType | null
    selectedPODProduct: any | null
    variants: any[]
    available_variant: any[]
    print_positions: any[]
    isProductTypePopoverOpen: boolean
}

interface Action {
    updateProductPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetProductPageState: () => void
}

const initialState: State = {
    selectedProductType: null,
    selectedPODProduct: null,
    variants: [],
    available_variant: [],
    print_positions: [],
    isProductTypePopoverOpen: false
}

const useProductPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateProductPageState: (key, value) => {
        set((state) => ({
            ...state,
            [key]: value
        }))
    },
    resetProductPageState: () => set(() => ({ ...initialState }))
}))

export default useProductPageStore