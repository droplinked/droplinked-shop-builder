import React, { useState } from 'react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import EmailConfirmation from '../common/email-confirmation/EmailConfirmation'
import useAppToast from 'hooks/toast/useToast'

function ResetPasswordEmailConfirmation({ onBack, onNext }: OnboardingStepProps) {
    const [otp, setOtp] = useState('')
    const [inputState, setInputState] = useState<'default' | 'error' | 'success'>('default')
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const { showToast } = useAppToast()

    const onOtpChange = (value: string) => {
        setOtp(value)
        setInputState('default')
    }

    const verifyEmail = async () => {
        setVerifyLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock validation - for testing purposes only
        if (otp === '123456') {
            setInputState('success')
            showToast({ type: "success", message: "Code verified successfully" })
            // Wait a bit to show the success state before moving to next step
            setTimeout(() => {
                onNext()
            }, 500)
        } else {
            setInputState('error')
            showToast({ type: "error", message: "Invalid verification code" })
        }
        setVerifyLoading(false)
    }

    const resendCode = async () => {
        setResendLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setResendLoading(false)
        setOtp('')
        setInputState('default')
        showToast({ type: "success", message: "New code sent to your email" })
    }

    return (
        <EmailConfirmation
            otp={otp}
            inputState={inputState}
            onOtpChange={onOtpChange}
            verifyEmail={verifyEmail}
            resendCode={resendCode}
            verifyLoading={verifyLoading}
            resendLoading={resendLoading}
            loginLoading={false}
            onBack={onBack}
        />
    )
}

export default ResetPasswordEmailConfirmation 