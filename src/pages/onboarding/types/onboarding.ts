import { subscriptionPlans } from "utils/constants/subscriptionPlans"

export interface OnboardingStates {
    currentStep: 'SIGN_IN' | 'SIGN_UP' | 'EMAIL_CONFIRMATION' | 'STORE_DETAILS' | 'PAYMENT_DETAILS' | 'PLAN_SELECTION' | 'YOU_ARE_ALL_SET'
    storeSetup: StoreSetup
    storeSetupError: Partial<StoreSetup>
}

export interface OnboardingActions {
    nextStep: () => void
    prevStep: () => void
    updateOnboardingState: <K extends keyof OnboardingStates>(field: K, value: OnboardingStates[K]) => void
    setError: (field: keyof OnboardingStates['storeSetupError'], message: string | undefined) => void
    clearErrors: () => void
}

export interface StoreSetup {
    logoUrl: string
    coverImage: string
    url: string
    name: string
    description: string
}

export interface ProductCardData {
    frontTitle: string
    frontDescription: string
    iconType: 'physical' | 'digital' | 'print' | 'nft'
    frontBackgroundImage: string
    backBackgroundImage: string
}

export interface OnboardingStepProps {
    onBack: () => void
    onNext: () => void
}

export type PlanType = keyof typeof subscriptionPlans;