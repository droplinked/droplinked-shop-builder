import React from "react"
import { subscriptionPlans } from "utils/constants/subscriptionPlans"

export type StoreSetup = {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
    autoAddSampleProductsEnabled: boolean
    hasExistingShop: boolean
}

export type OnboardingStates = {
    currentStep:
    'SIGN_IN' |
    'SIGN_UP' |
    'SIGNUP_EMAIL_VERIFICATION' |
    'RESET_PASSWORD' |
    'RESET_PASSWORD_VERIFICATION' |
    'SET_NEW_PASSWORD' |
    'PASSWORD_UPDATED' |
    'EXISTING_WEBSITE' |
    'STORE_DETAILS' |
    'PAYMENT_DETAILS' |
    'PLAN_SELECTION' |
    'YOU_ARE_ALL_SET' |
    'PLAN_SELECTION_DISPLAY'
    storeSetup: StoreSetup
    storeSetupErrors: Partial<Record<keyof StoreSetup, string>>
    credentials: {
        email: string
        password: string
    }
    resetToken: string | null
}

export type OnboardingActions = {
    updateOnboardingState: <K extends keyof OnboardingStates>(field: K, value: OnboardingStates[K]) => void
    setError: (field: keyof StoreSetup, message: string) => void
    clearErrors: () => void
    resetOnboarding: () => void
}

export interface ProductCardData {
    frontTitle?: string
    frontDescription?: string
    iconType?: 'physical' | 'digital' | 'print' | 'nft'
    frontBackgroundImage?: string
    backBackgroundImage?: string
    isMockElement?: boolean
}

export type PlanType = keyof typeof subscriptionPlans

export interface LayoutProps {
    leftContent: React.ReactNode
    rightContent: React.ReactNode | null
    isAuthStep: boolean
}