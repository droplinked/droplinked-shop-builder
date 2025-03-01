import { useState } from 'react'
import { OnboardingStepData } from '../types/onboarding'

export function useOnboarding() {
    const [currentStep, setCurrentStep] = useState(0)
    const [shopData, setShopData] = useState({})

    const stepData: OnboardingStepData[] = [
        { type: 'sign-in' },
        { type: 'sign-up' },
        { type: 'email-confirmation' },
        { type: 'feature-selection' },
        { type: 'shop-setup' },
        { type: 'payment-setup' },
        { type: 'subscription-plan' },
        { type: 'completion' }
    ]

    function nextStep() {
        if (currentStep < stepData.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    function updateShopData(data: Partial<typeof shopData>) {
        setShopData({ ...shopData, ...data })
    }

    return { currentStep, stepData, nextStep, prevStep, shopData, updateShopData }
}