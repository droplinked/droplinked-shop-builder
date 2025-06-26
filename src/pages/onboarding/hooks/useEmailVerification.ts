import useAppToast from 'hooks/toast/useToast'
import { forgetPasswordService, verifyResetPasswordCodeService } from 'lib/apis/auth/services'
import { resendEmailService, verifyEmailCode } from 'lib/apis/user/services'
import { useState } from 'react'
import { useMutation } from 'react-query'
import useOnboardingStore from '../stores/useOnboardingStore'
import { useLogin } from './useLogin'

interface Props {
    mode: 'signup' | 'reset'
}

export const useEmailVerification = ({ mode }: Props) => {
    // State management
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<'default' | 'error' | 'success'>("default")

    // Hooks
    const { credentials, updateOnboardingState } = useOnboardingStore()
    const { onLoginSubmit, loading: loginLoading } = useLogin()
    const { showToast } = useAppToast()
    const { email } = credentials

    // Service selection based on mode
    const verifyConfirmationCodeService = mode === 'signup'
        ? () => verifyEmailCode({ code: otp, email })
        : () => verifyResetPasswordCodeService({ code: otp, email })

    const resendConfirmationCodeService = mode === 'signup'
        ? () => resendEmailService({ email })
        : () => forgetPasswordService({ email })

    // Success handlers
    const handleVerifySuccess = async (response: any) => {
        setInputState("success")

        if (mode === 'signup') {
            await onLoginSubmit(credentials)
            updateOnboardingState('currentStep', 'EXISTING_WEBSITE')
            return
        }

        updateOnboardingState('resetToken', response.data.data.resetToken)
        updateOnboardingState('currentStep', 'SET_NEW_PASSWORD')
        showToast({ type: "success", message: "Code verified successfully" })
    }

    // Verification mutation
    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: verifyConfirmationCodeService,
        onSuccess: handleVerifySuccess,
        onError: (error: any) => {
            setInputState("error")
            showToast({
                type: "error",
                message: error?.response?.data?.message || "Invalid verification code"
            })
        }
    })

    // Resend code query
    const { mutateAsync: resendCode, isLoading: resendLoading } = useMutation({
        mutationFn: resendConfirmationCodeService,
        onSuccess: () => {
            showToast({ type: "success", message: "Verification code sent to your email" })
        },
        onError: (error: any) => {
            showToast({
                type: "error",
                message: error?.response?.data?.message || "Failed to send code"
            })
        },
        onSettled: () => {
            setInputState("default")
            setOtp("")
        }
    })

    // Input handlers
    const onOtpChange = (value: string) => {
        setOtp(value)
        setInputState("default")
    }

    return {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading,
        resendLoading,
        loginLoading
    }
}
