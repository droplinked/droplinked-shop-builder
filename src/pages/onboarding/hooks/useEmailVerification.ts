import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { verifyEmailCode, resendEmailService, verifyResetPasswordCode, forgetPasswordService } from 'lib/apis/user/services'
import useAppToast from 'hooks/toast/useToast'
import { useLogin } from './useLogin'
import useOnboardingStore from '../stores/useOnboardingStore'

interface EmailVerificationConfig {
    mode: 'signup' | 'reset';
    onSuccess?: () => void;
}

export const useEmailVerification = ({ mode, onSuccess }: EmailVerificationConfig) => {
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<'default' | 'error' | 'success'>("default")
    const { credentials, updateOnboardingState } = useOnboardingStore()
    const { onLoginSubmit, loading: loginLoading } = useLogin()
    const { showToast } = useAppToast()

    const verifyService = mode === 'signup' 
        ? () => verifyEmailCode({ code: otp, email: credentials.email })
        : () => verifyResetPasswordCode({ code: otp, email: credentials.email });

    const resendService = mode === 'signup'
        ? () => resendEmailService({ email: credentials.email })
        : () => forgetPasswordService({ email: credentials.email });

    const handleSuccess = async (response: any) => {
        setInputState("success")
        if (mode === 'signup') {
            await onLoginSubmit(credentials)
        } else {
            updateOnboardingState('resetToken', response.data.data.resetToken)
            showToast({ type: "success", message: "Code verified successfully" })
            onSuccess?.()
        }
    }

    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: verifyService,
        onSuccess: handleSuccess,
        onError: (error: any) => {
            setInputState("error")
            showToast({ 
                type: "error", 
                message: error?.response?.data?.message || "Invalid verification code" 
            })
        }
    })

    const { refetch: resendCode, isFetching: resendLoading } = useQuery({
        queryKey: ["resend-email-code", mode],
        queryFn: resendService,
        enabled: mode === 'signup',
        onSettled() {
            setInputState("default")
            setOtp("")
        },
        onSuccess() {
            showToast({ type: "success", message: mode === 'signup' ? "Verification code sent to your email" : "Code sent successfully" })
        },
        onError(error: any) {
            showToast({ 
                type: "error", 
                message: error?.response?.data?.message || "Failed to send code" 
            })
        },
    })

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
