import React from "react"
import { subscriptionPlans } from "utils/constants/subscriptionPlans"

// Shop data that will be sent to backend
export type ShopData = {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
}

// UI state for shop setup step
export type ShopSetupUI = {
    autoAddSampleProductsEnabled: boolean
    hasExistingShop: boolean
    businessCategory: string
    businessDescription: string
}

// AI generated content state
export type AiGeneratedContent = {
    logos: string[]
    covers: string[]
    urls: string[]
    names: string[]
    isLoading: {
        logos: boolean
        covers: boolean
        urls: boolean
        names: boolean
    }
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
    shopData: ShopData
    shopSetupUI: ShopSetupUI
    aiGeneratedContent: AiGeneratedContent
    storeSetupErrors: Partial<Record<keyof ShopData, string>>
    credentials: {
        email: string
        password: string
    }
    resetToken: string | null
}

export type OnboardingActions = {
    updateOnboardingState: <K extends keyof OnboardingStates>(field: K, value: OnboardingStates[K]) => void
    updateShopData: (field: keyof ShopData, value: string) => void
    updateShopSetupUI: (field: keyof ShopSetupUI, value: any) => void
    updateAiContent: (field: keyof Omit<AiGeneratedContent, 'isLoading'>, value: string[]) => void
    updateAiLoadingState: (field: keyof AiGeneratedContent['isLoading'], isLoading: boolean) => void
    setError: (field: keyof ShopData, message: string) => void
    clearErrors: () => void
    resetOnboarding: () => void
    resetShopData: () => void
    resetAiContent: () => void
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