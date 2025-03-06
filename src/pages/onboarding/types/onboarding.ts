import { JSX } from "react"

export interface OnboardingStepData {
    type:
    | 'sign-in'
    | 'sign-up'
    | 'email-confirmation'
    | 'feature-selection'
    | 'shop-setup'
    | 'payment-setup'
    | 'subscription-plan'
    | 'completion'
    title?: string              // Optional title for each step
    leftContent?: JSX.Element   // Pre-rendered left content (if needed)
    rightContent?: JSX.Element  // Pre-rendered right content (if needed)
}

// Additional types for shop data (used in Step 5+)
export interface ShopData {
    url?: string
    name?: string
    description?: string
    logo?: File | string
    coverImage?: File | string
    currency?: string
    paymentMethods?: string[]
    subscriptionPlan?: string
}

export interface ProductCardData {
    frontTitle: string
    frontDescription: string
    iconType: 'physical' | 'digital' | 'print' | 'nft'
    frontBackgroundImage: string
    backBackgroundImage: string
}