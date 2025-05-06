import { create } from 'zustand'
import { CrawledProductsType, ProductType } from '../utils/types'
import { testData } from './testData'

interface State {
    selectedProductType: ProductType
    selectedPODProduct: any
    variants: any[]
    available_variants: any[]
    print_positions: any[]
    editingProductId: string
    isAiGenerateLoading: boolean
    isGenerateDisabled: boolean
    crawledProducts: CrawledProductsType[]
    targetShopUrl: string
    crawlerError: string,
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
    editingProductId: null,
    isAiGenerateLoading: false,
    isGenerateDisabled: false,
    crawledProducts: testData,
    targetShopUrl: "",
    crawlerError: "",
}

const useProductPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateProductPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetProductPageState: () => set(() => ({ ...initialState })),
}))

export default useProductPageStore