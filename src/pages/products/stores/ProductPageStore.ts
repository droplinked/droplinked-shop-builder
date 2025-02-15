import { create } from 'zustand'
import { AiGenerationData, ProductType } from '../utils/types'

interface State {
    selectedProductType: ProductType
    selectedPODProduct: any
    variants: any[]
    available_variants: any[]
    print_positions: any[]
    editingProductId: string
    aiGenerationData: AiGenerationData
}

interface Action {
    updateProductPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetProductPageState: () => void
    setGenerateTitleDescriptionLoading: (isLoading: boolean) => void
    updateAiGenerationData: (aiGenerationData: AiGenerationData) => void
}

const initialState: State = {
    selectedProductType: null,
    selectedPODProduct: null,
    variants: [],
    available_variants: [],
    print_positions: [],
    editingProductId: null,
    aiGenerationData: {},
}

const useProductPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateProductPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetProductPageState: () => set(() => ({ ...initialState })),
    updateAiGenerationData: (aiGenerationData: AiGenerationData) => set(state => ({ ...state, aiGenerationData })),
    setGenerateTitleDescriptionLoading: (isLoading) => set(state => ({
        ...state,
        aiGenerationData: {
            ...state.aiGenerationData,
            isDescriptionLoading: isLoading,
            isTitleLoading: isLoading,
            isDescriptionLoaded: false,
            isTitleLoaded: false
        }
    }))
}))

export default useProductPageStore