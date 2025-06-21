import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OnboardingActions, OnboardingStates } from '../types/onboarding'

// Shop data that will be sent to backend
export const initialShopData = {
    logo: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
    hero_section: '',
    shop_url: '',
    name: '',
    description: ''
}

// UI state for shop setup step
export const initialShopSetupUI = {
    autoAddSampleProductsEnabled: false,
    hasExistingShop: false,
    businessCategory: '',
    businessDescription: ''
}

// AI generated content state
export const initialAiContent = {
    logos: [],
    covers: [],
    urls: [],
    names: [],
    isLoading: {
        logos: false,
        covers: false,
        urls: false,
        names: false
    }
}

const initialState: OnboardingStates = {
    currentStep: 'STORE_DETAILS',
    shopData: initialShopData,
    shopSetupUI: initialShopSetupUI,
    aiGeneratedContent: initialAiContent,
    storeSetupErrors: {},
    credentials: { email: '', password: '' },
    resetToken: null
}

const useOnboardingStore = create<OnboardingStates & OnboardingActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Update any onboarding state field
            updateOnboardingState: (field, value) => set((state) => ({ ...state, [field]: value })),

            // Shop data management
            updateShopData: (field, value) => set((state) => ({
                shopData: { ...state.shopData, [field]: value }
            })),

            // UI state management
            updateShopSetupUI: (field, value) => set((state) => ({
                shopSetupUI: { ...state.shopSetupUI, [field]: value }
            })),

            // AI content management
            updateAiContent: (field, value) => set((state) => ({
                aiGeneratedContent: { ...state.aiGeneratedContent, [field]: value }
            })),

            updateAiLoadingState: (field, isLoading) => set((state) => ({
                aiGeneratedContent: {
                    ...state.aiGeneratedContent,
                    isLoading: { ...state.aiGeneratedContent.isLoading, [field]: isLoading }
                }
            })),

            // Error management
            setError: (field, message) => set((state) => ({
                storeSetupErrors: { ...state.storeSetupErrors, [field]: message }
            })),
            clearErrors: () => set({ storeSetupErrors: {} }),

            // Reset functions
            resetOnboarding: () => set(initialState),
            resetShopData: () => set((state) => ({ ...state, shopData: initialShopData })),
            resetAiContent: () => set((state) => ({ ...state, aiGeneratedContent: initialAiContent }))
        }),
        {
            name: 'onboarding-storage'
        }
    )
)

export default useOnboardingStore