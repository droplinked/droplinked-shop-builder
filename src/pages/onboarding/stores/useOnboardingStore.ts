import { create } from 'zustand'

export interface OnboardingStates {
    currentStep: number
    storeSetup: {
        logoUrl: string
        coverImage: string
        url: string
        name: string
        description: string
    }
    errors: {
        url?: string
        name?: string
        description?: string
    }
}

interface OnboardingActions {
    nextStep: () => void
    prevStep: () => void
    updateOnboardingState: <K extends keyof OnboardingStates>(
        field: K,
        value: OnboardingStates[K]
    ) => void
    setError: (field: keyof OnboardingStates['errors'], message: string | undefined) => void
    clearErrors: () => void
}

export const initialStoreSetup = {
    logoUrl: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    coverImage: '',
    url: '',
    name: '',
    description: ''
}

const useOnboardingStore = create<OnboardingStates & OnboardingActions>((set) => ({
    // States
    currentStep: 1,
    storeSetup: initialStoreSetup,
    errors: {},

    // Actions
    nextStep: () => set((state) => ({
        currentStep: state.currentStep < 7 ? state.currentStep + 1 : state.currentStep
    })),
    prevStep: () => set((state) => ({
        currentStep: state.currentStep > 1 ? state.currentStep - 1 : state.currentStep
    })),
    updateOnboardingState: (field, value) => set((state) => ({
        ...state,
        [field]: value
    })),
    setError: (field, message) => set((state) => ({
        errors: { ...state.errors, [field]: message }
    })),
    clearErrors: () => set({ errors: {} })
}))

export default useOnboardingStore