import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OnboardingActions, OnboardingStates } from '../types/onboarding'

export const initialStoreSetup = {
    logo: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    hero_section: '',
    shop_url: '',
    name: '',
    description: '',
    autoAddSampleProductsEnabled: false
}

const initialState: OnboardingStates = {
    currentStep: 'SIGN_IN',
    storeSetup: initialStoreSetup,
    storeSetupErrors: {},
    credentials: {
        email: '',
        password: ''
    },
}

// Define flows
const mainFlow: OnboardingStates['currentStep'][] = [
    'SIGN_IN',
    'SIGN_UP',
    'SIGNUP_EMAIL_VERIFICATION',
    'STORE_DETAILS',
    'PAYMENT_DETAILS',
    'PLAN_SELECTION',
    'YOU_ARE_ALL_SET'
]

const resetPasswordFlow: OnboardingStates['currentStep'][] = [
    'RESET_PASSWORD',
    'RESET_PASSWORD_VERIFICATION',
    'SET_NEW_PASSWORD',
    'PASSWORD_UPDATED',
    'SIGN_IN'
]

const getNextStep = (currentStep: OnboardingStates['currentStep']): OnboardingStates['currentStep'] => {
    // Handle main flow (including sign in to sign up)
    const mainIndex = mainFlow.indexOf(currentStep)
    if (mainIndex !== -1 && mainIndex < mainFlow.length - 1) {
        return mainFlow[mainIndex + 1]
    }

    // Handle reset password flow
    const resetIndex = resetPasswordFlow.indexOf(currentStep)
    if (resetIndex !== -1 && resetIndex < resetPasswordFlow.length - 1) {
        return resetPasswordFlow[resetIndex + 1]
    }

    return currentStep
}

const useOnboardingStore = create<OnboardingStates & OnboardingActions>()(
    persist(
        (set) => ({
            ...initialState,

            nextStep: () => set((state) => {
                const nextStep = getNextStep(state.currentStep)
                if (nextStep !== state.currentStep) {
                    window.history.replaceState({}, document.title, window.location.pathname)
                    return { currentStep: nextStep }
                }
                return state
            }),

            prevStep: () => set((state) => {
                // For reset password flow
                if (resetPasswordFlow.includes(state.currentStep)) {
                    const currentIndex = resetPasswordFlow.indexOf(state.currentStep)
                    if (currentIndex > 0) {
                        return { currentStep: resetPasswordFlow[currentIndex - 1] }
                    }
                }

                // For main flow
                const mainIndex = mainFlow.indexOf(state.currentStep)
                if (mainIndex > 0) {
                    return { currentStep: mainFlow[mainIndex - 1] }
                }

                return { currentStep: 'SIGN_IN' }
            }),

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