import { create } from 'zustand'
import { ProductType } from '../utils/types'

interface State {
    selectedProductType: ProductType
    selectedPODProduct: any
    variants: any[]
    available_variants: any[]
    print_positions: any[]
    isProductTypePopoverOpen: boolean
    editingProductId: string
}

interface Action {
    updateProductPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetProductPageState: () => void
}

const initialState: State = {
    selectedProductType: null,
    selectedPODProduct: null,
    variants: [],
    available_variants: [],
    print_positions: [],
    isProductTypePopoverOpen: false,
    editingProductId: null
}

const useProductPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateProductPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetProductPageState: () => set(() => ({ ...initialState }))
}))

export default useProductPageStore