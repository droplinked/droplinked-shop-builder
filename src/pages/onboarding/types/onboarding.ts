import React from "react"
import { subscriptionPlans } from "utils/constants/subscriptionPlans"

export interface OnboardingStates {
    currentStep: 'SIGN_IN' | 
                'SIGN_UP' | 
                'SIGNUP_EMAIL_VERIFICATION' |
                'RESET_PASSWORD' | 
                'RESET_PASSWORD_VERIFICATION' |
                'SET_NEW_PASSWORD' | 
                'PASSWORD_UPDATED' | 
                'STORE_DETAILS' | 
                'PAYMENT_DETAILS' | 
                'PLAN_SELECTION' | 
                'YOU_ARE_ALL_SET'
    previousStep?: 'SIGN_UP' | 'RESET_PASSWORD'
    storeSetup: StoreSetup
    storeSetupErrors: Partial<StoreSetup>
    credentials: {
        email: string
        password: string
    }
    resetToken: string | null
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
    autoAddSampleProductsEnabled: boolean
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