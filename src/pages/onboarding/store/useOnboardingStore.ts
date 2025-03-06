import { create } from 'zustand'
import { OnboardingStepData } from '../types/onboarding'

interface OnboardingData {
    currentStep: number
    storeData: {
        logoUrl: string
        coverImage: string
        url: string
        name: string
        description: string
    }
    stepData: OnboardingStepData[]
}

interface OnboardingActions {
    nextStep: () => void
    prevStep: () => void
    updateStoreField: <K extends keyof OnboardingData['storeData']>(
        field: K,
        value: OnboardingData['storeData'][K]
    ) => void
    clearStoreData: () => void
}

type OnboardingState = OnboardingData & OnboardingActions

const initialStoreData = {
    logoUrl: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    coverImage: '',
    url: '',
    name: '',
    description: ''
}

const initialStepData: OnboardingStepData[] = [
    { type: 'sign-in' },
    { type: 'sign-up' },
    { type: 'email-confirmation' },
    { type: 'shop-setup' },
    { type: 'feature-selection' },
    { type: 'payment-setup' },
    { type: 'subscription-plan' },
    { type: 'completion' }
]

const useOnboardingStore = create<OnboardingState>((set) => ({
    // Data
    currentStep: 0,
    storeData: initialStoreData,
    stepData: initialStepData,

    // Actions
    nextStep: () => set((state) => ({
        currentStep: state.currentStep < state.stepData.length - 1
            ? state.currentStep + 1
            : state.currentStep
    })),
    prevStep: () => set((state) => ({
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep
    })),
    updateStoreField: (field, value) => set((state) => ({
        storeData: {
            ...state.storeData,
            [field]: value
        }
    })),
    clearStoreData: () => set({ storeData: initialStoreData })
}))

export default useOnboardingStore
