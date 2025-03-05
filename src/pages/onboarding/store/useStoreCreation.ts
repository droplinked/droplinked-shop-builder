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
    logoUrl: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
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
