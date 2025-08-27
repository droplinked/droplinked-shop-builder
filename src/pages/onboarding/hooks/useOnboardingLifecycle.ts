import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useOnboardingStore from '../stores/useOnboardingStore'

export function useOnboardingLifecycle() {
    const { search } = useLocation()
    const { currentStep, updateOnboardingState, updateShopSetupUI, resetOnboarding } = useOnboardingStore()

    const searchParams = new URLSearchParams(search)
    const entry = searchParams.get('entry')
    const source = searchParams.get('source')

    // Handle URL entry parameters when component mounts
    useEffect(() => {
        if (entry === 'signin') updateOnboardingState('currentStep', 'SIGN_IN')
        else if (entry === 'signup') updateOnboardingState('currentStep', 'SIGN_UP')
        else if (entry === 'email-verification') updateOnboardingState('currentStep', 'SIGNUP_EMAIL_VERIFICATION')
        else if (entry === 'existing-website') updateOnboardingState('currentStep', 'EXISTING_WEBSITE')
    }, [updateOnboardingState, entry])

    // Handle Crossmint source parameter separately
    useEffect(() => {
        if (source === 'crossmint') {
            updateShopSetupUI('isFromCrossmint', true)
        }
    }, [updateShopSetupUI, source])

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentStep])

    // Reset store when user navigates away from /onboarding
    useEffect(() => {
        return () => {
            resetOnboarding()
        }
    }, [resetOnboarding])

    return {
        currentStep
    }
}
