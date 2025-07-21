import useAppToast from 'hooks/toast/useToast'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { forgetPasswordService, verifyResetPasswordCodeService } from 'services/auth/services'
import { resendEmailService, verifyEmailCode } from 'services/user/services'
import useOnboardingStore from '../stores/useOnboardingStore'
import { useLogin } from './useLogin'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

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
    const { t } = useLocaleResources('onboarding')

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
        showToast({ type: "success", message: t('useEmailVerification.success.codeVerified') })
    }

    // Verification mutation
    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: verifyConfirmationCodeService,
        onSuccess: handleVerifySuccess,
        onError: (error: any) => {
            setInputState("error")
            showToast({
                type: "error",
                message: error?.response?.data?.message || t('useEmailVerification.errors.invalidVerificationCode')
            })
        }
    })

    // Resend code query
    const { mutateAsync: resendCode, isLoading: resendLoading } = useMutation({
        mutationFn: resendConfirmationCodeService,
        onSuccess: () => {
            showToast({ type: "success", message: t('useEmailVerification.success.verificationCodeSent') })
        },
        onError: (error: any) => {
            showToast({
                type: "error",
                message: error?.response?.data?.message || t('useEmailVerification.errors.failedToSendCode')
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
