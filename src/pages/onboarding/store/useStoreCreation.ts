import { create } from 'zustand'

interface StoreCreationState {
    storeData: {
        logoUrl: string
        coverImage: string
        url: string
        name: string
        description: string
    }
    clearStoreData: () => void
    updateStoreField: <K extends keyof StoreCreationState['storeData']>(
        field: K,
        value: StoreCreationState['storeData'][K]
    ) => void
}

const initialStoreData = {
    logoUrl: '',
    coverImage: '',
    url: '',
    name: '',
    description: ''
}

const useStoreCreation = create<StoreCreationState>((set) => ({
    storeData: initialStoreData,
    clearStoreData: () => set({ storeData: initialStoreData }),
    updateStoreField: (field, value) => set((state) => ({
        storeData: {
            ...state.storeData,
            [field]: value
        }
    }))
}))

export default useStoreCreation
