import { create } from 'zustand'

interface StoreCreationState {
    storeData: {
        logoUrl: string
        coverImage: string
        url: string
        name: string
        description: string
    }
    setStoreData: (data: StoreCreationState['storeData']) => void
    updateStoreField: <K extends keyof StoreCreationState['storeData']>(
        field: K,
        value: StoreCreationState['storeData'][K]
    ) => void
}

const useStoreCreation = create<StoreCreationState>((set) => ({
    storeData: {
        logoUrl: '',
        coverImage: '',
        url: '',
        name: '',
        description: ''
    },
    setStoreData: (data) => set({ storeData: data }),
    updateStoreField: (field, value) => set((state) => ({
        storeData: {
            ...state.storeData,
            [field]: value
        }
    }))
}))

export default useStoreCreation
