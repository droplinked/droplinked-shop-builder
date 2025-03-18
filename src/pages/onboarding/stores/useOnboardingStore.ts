import { create } from 'zustand'
import { OnboardingActions, OnboardingStates } from '../types/onboarding'

export const initialStoreSetup = {
    logo: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    hero_section: '',
    shop_url: '',
    name: '',
    description: ''
}

const stepOrder: OnboardingStates['currentStep'][] = [
    'SIGN_IN',
    'SIGN_UP',
    'EMAIL_CONFIRMATION',
    'STORE_DETAILS',
    'PAYMENT_DETAILS',
    'PLAN_SELECTION',
    'YOU_ARE_ALL_SET'
]

const useOnboardingStore = create<OnboardingStates & OnboardingActions>((set) => ({
    currentStep: 'SIGN_IN',
    storeSetup: initialStoreSetup,
    storeSetupErrors: {},
    email: "",
    credentials: {
        email: '',
        password: ''
    },

    nextStep: () => set((state) => {
        const currentIndex = stepOrder.indexOf(state.currentStep)
        const nextIndex = currentIndex + 1
        if (nextIndex < stepOrder.length) {
            window.history.replaceState({}, document.title, window.location.pathname)
            return { currentStep: stepOrder[nextIndex] }
        }
        return state
    }),

    prevStep: () => set((state) => {
        const currentIndex = stepOrder.indexOf(state.currentStep)
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
            window.history.replaceState({}, document.title, window.location.pathname)
            return { currentStep: stepOrder[prevIndex] }
        }
        return state
    }),

    updateOnboardingState: (field, value) => set((state) => ({ ...state, [field]: value })),

    setError: (field, message) => set((state) => ({
        storeSetupErrors: { ...state.storeSetupErrors, [field]: message }
    })),

    clearErrors: () => set({ storeSetupErrors: {} })
}))

export default useOnboardingStore