import { create } from 'zustand'
import { OnboardingStepData } from '../types/onboarding'

export interface OnboardingData {
    currentStep: number
    storeData: {
        logoUrl: string
        coverImage: string
        url: string
        name: string
        description: string
    }
    stepData: OnboardingStepData[]
    errors: {
        url?: string
        name?: string
        description?: string
    }
}

interface OnboardingActions {
    nextStep: () => void
    prevStep: () => void
    updateOnboardingState: <K extends keyof OnboardingData>(
        field: K,
        value: OnboardingData[K]
    ) => void
    setError: (field: keyof OnboardingData['errors'], message: string | undefined) => void
    clearErrors: () => void
}

export const initialStoreData = {
    logoUrl: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    coverImage: '',
    url: '',
    name: '',
    description: ''
}

const initialStepData: OnboardingStepData[] = [
    { type: 'sign-in', heading: 'Welcome to droplinked', description: 'Sign in with your credentials below.' },
    { type: 'sign-up', heading: 'Welcome to droplinked', description: 'Complete the details below or use your Google account.' },
    { type: 'email-confirmation', heading: 'Confirm Email', description: 'Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox.' },
    { type: 'shop-setup', heading: 'Store Details', description: 'Complete the information below to optimize your storefront.' },
    { type: 'payment-setup', heading: 'Basic Payment Details', description: 'Choose from the different package options below.' },
    { type: 'subscription-plan', heading: 'Plans', description: 'Choose a plan' },
    { type: 'subscription-plan', heading: 'Plans', description: 'Choose a plan' },
    { type: 'completion', heading: 'You’re All Set!', description: 'Your account is now live and ready to use.' }]

const useOnboardingStore = create<OnboardingData & OnboardingActions>((set) => ({
    // Data
    currentStep: 3,
    storeData: initialStoreData,
    stepData: initialStepData,
    errors: {},

    // Actions
    nextStep: () => set((state) => ({
        currentStep: state.currentStep < state.stepData.length - 1
            ? state.currentStep + 1
            : state.currentStep
    })),
    prevStep: () => set((state) => ({
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep
    })),
    updateOnboardingState: (field, value) => set((state) => ({
        ...state,
        [field]: value
    })),
    setError: (field, message) => set((state) => ({
        errors: {
            ...state.errors,
            [field]: message
        }
    })),
    clearErrors: () => set({ errors: {} })
}))

export default useOnboardingStore