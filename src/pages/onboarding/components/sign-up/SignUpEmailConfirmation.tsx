import React from 'react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import EmailConfirmation from '../common/email-confirmation/EmailConfirmation'

function SignUpEmailConfirmation({ onBack }: OnboardingStepProps) {
    return (
        <EmailConfirmation
            mode="signup"
            onBack={onBack}
        />
    )
}

export default SignUpEmailConfirmation 