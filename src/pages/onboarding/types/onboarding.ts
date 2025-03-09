export interface OnboardingStepData {
    type:
    | 'sign-in'
    | 'sign-up'
    | 'email-confirmation'
    | 'shop-setup'
    | 'payment-setup'
    | 'subscription-plan'
    | 'completion'
    heading: string
    description: string
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

export interface OnboardingStepProps {
    onBack: () => void
    onNext: () => void
}