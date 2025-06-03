import useAppToast from 'hooks/toast/useToast'
import { forgetPasswordService, resendEmailService, verifyEmailCode, verifyResetPasswordCode } from 'lib/apis/user/services'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import useOnboardingStore from '../stores/useOnboardingStore'
import { useLogin } from './useLogin'

interface Props {
    mode: 'signup' | 'reset'
    onNext: () => void
}

export const useEmailVerification = ({ mode, onNext }: Props) => {
    // State management
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<'default' | 'error' | 'success'>("default")

    // Hooks
    const { credentials, updateOnboardingState } = useOnboardingStore()
    const { onLoginSubmit, loading: loginLoading } = useLogin()
    const { showToast } = useAppToast()
    const { email } = credentials

    // Service selection based on mode
    const getVerificationService = () => {
        return mode === 'signup'
            ? () => verifyEmailCode({ code: otp, email })
            : () => verifyResetPasswordCode({ code: otp, email })
    }

    const getResendService = () => {
        return mode === 'signup'
            ? () => resendEmailService({ email })
            : () => forgetPasswordService({ email })
    }

    // Success handlers
    const handleVerifySuccess = async (response: any) => {
        setInputState("success")

        if (mode === 'signup') {
            await onLoginSubmit(credentials)
            return
        }

        updateOnboardingState('resetToken', response.data.data.resetToken)
        showToast({ type: "success", message: "Code verified successfully" })
        onNext()
    }

    // Verification mutation
    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: getVerificationService(),
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
    const { refetch: resendCode, isFetching: resendLoading } = useQuery({
        queryKey: ["resend-email-code", mode],
        queryFn: getResendService(),
        enabled: false,
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
        },
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
