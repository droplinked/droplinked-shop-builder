import React from 'react'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import EmailConfirmation from '../common/email-confirmation/EmailConfirmation'

function SignUpEmailConfirmation({ onBack }: OnboardingStepProps) {
    const {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading,
        resendLoading,
        loginLoading
    } = useEmailVerification()

    return (
        <EmailConfirmation
            otp={otp}
            inputState={inputState}
            onOtpChange={onOtpChange}
            verifyEmail={verifyEmail}
            resendCode={resendCode}
            verifyLoading={verifyLoading || loginLoading}
            resendLoading={resendLoading}
            onBack={onBack} loginLoading={false}        />
    )
}

export default SignUpEmailConfirmation 