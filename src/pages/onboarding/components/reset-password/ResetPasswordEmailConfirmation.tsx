import React from 'react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import EmailConfirmation from '../common/email-confirmation/EmailConfirmation'

function ResetPasswordEmailConfirmation({ onBack, onNext }: OnboardingStepProps) {
    return (
        <EmailConfirmation
            mode="reset"
            onBack={onBack}
            onNext={onNext}
        />
    )
}

export default ResetPasswordEmailConfirmation 