import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useOnboardingStore from '../stores/useOnboardingStore'

export function useOnboardingLifecycle() {
    const location = useLocation()
    const { currentStep, updateOnboardingState, shopSetupUI, resetOnboarding } = useOnboardingStore()

    // Handle URL entry parameters when component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const entry = searchParams.get('entry')
        const source = searchParams.get('source')

        if (entry === 'signin') updateOnboardingState('currentStep', 'SIGN_IN')
        else if (entry === 'signup') updateOnboardingState('currentStep', 'SIGN_UP')
        else if (entry === 'email-verification') updateOnboardingState('currentStep', 'SIGNUP_EMAIL_VERIFICATION')
        else if (entry === 'existing-website') updateOnboardingState('currentStep', 'EXISTING_WEBSITE')

        // Check if user came from Crossmint landing page
        if (source === 'crossmint') {
            updateOnboardingState('shopSetupUI', { ...shopSetupUI, isFromCrossmint: true })
        }
    }, [updateOnboardingState, shopSetupUI])

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentStep])

    // Reset store when user navigates away from /onboarding
    useEffect(() => {
        return () => {
            resetOnboarding()
        }
    }, [location.pathname, resetOnboarding])

    return {
        currentStep
    }
}
