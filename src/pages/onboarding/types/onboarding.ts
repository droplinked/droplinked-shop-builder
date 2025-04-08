import React from "react"
import { subscriptionPlans } from "utils/constants/subscriptionPlans"

export interface OnboardingStates {
    currentStep: 'SIGN_IN' | 'SIGN_UP' | 'EMAIL_CONFIRMATION' | 'STORE_DETAILS' | 'PAYMENT_DETAILS' | 'PLAN_SELECTION' | 'YOU_ARE_ALL_SET'
    storeSetup: StoreSetup
    storeSetupErrors: Partial<StoreSetup>
    credentials: {
        email: string
        password: string
    }
}

export interface OnboardingActions {
    nextStep: () => void
    prevStep: () => void
    updateOnboardingState: <K extends keyof OnboardingStates>(field: K, value: OnboardingStates[K]) => void
    setError: (field: keyof OnboardingStates['storeSetupErrors'], message: string | undefined) => void
    clearErrors: () => void
    resetOnboarding: () => void
}

export interface StoreSetup {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
}

export interface ProductCardData {
    frontTitle?: string
    frontDescription?: string
    iconType?: 'physical' | 'digital' | 'print' | 'nft'
    frontBackgroundImage?: string
    backBackgroundImage?: string
    isMockElement?: boolean
}

export interface OnboardingStepProps {
    onBack: () => void
    onNext: () => void
}

export type PlanType = keyof typeof subscriptionPlans

export interface LayoutProps {
    leftContent: React.ReactNode
    rightContent: React.ReactNode | null
    isAuthStep: boolean
}