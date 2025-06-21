import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OnboardingActions, OnboardingStates } from '../types/onboarding'

export const initialStoreSetup = {
    logo: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    hero_section: '',
    shop_url: '',
    name: '',
    description: '',
    autoAddSampleProductsEnabled: false,
    hasExistingShop: false
}

const initialState: OnboardingStates = {
    currentStep: 'SIGN_IN',
    storeSetup: initialStoreSetup,
    storeSetupErrors: {},
    credentials: { email: '', password: '' },
    resetToken: null
}

const useOnboardingStore = create<OnboardingStates & OnboardingActions>()(
    persist(
        (set) => ({
            ...initialState,
            updateOnboardingState: (field, value) => set((state) => ({ ...state, [field]: value })),
            setError: (field, message) => set((state) => ({
                storeSetupErrors: { ...state.storeSetupErrors, [field]: message }
            })),
            clearErrors: () => set({ storeSetupErrors: {} }),
            resetOnboarding: () => set(initialState)
        }),
        {
            name: 'onboarding-storage'
        }
    )
)

export default useOnboardingStore