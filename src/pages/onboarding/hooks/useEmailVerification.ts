import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { verifyEmailCode, resendEmailService, verifyResetPasswordCode, forgetPasswordService } from 'lib/apis/user/services'
import useAppToast from 'hooks/toast/useToast'
import { useLogin } from './useLogin'
import useOnboardingStore from '../stores/useOnboardingStore'

interface EmailVerificationConfig {
    mode: 'signup' | 'reset';
    onNext?: () => void;
}

type InputState = 'default' | 'error' | 'success';

const getServices = (mode: 'signup' | 'reset', email: string, code: string) => ({
    verify: mode === 'signup'
        ? () => verifyEmailCode({ code, email })
        : () => verifyResetPasswordCode({ code, email }),
    resend: mode === 'signup'
        ? () => resendEmailService({ email })
        : () => forgetPasswordService({ email })
});

export const useEmailVerification = ({ mode, onNext }: EmailVerificationConfig) => {
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<InputState>("default")
    const { credentials, updateOnboardingState } = useOnboardingStore()
    const { onLoginSubmit, loading: loginLoading } = useLogin()
    const { showToast } = useAppToast()

    const services = getServices(mode, credentials.email, otp)

    const handleVerifySuccess = async (response: any) => {
        setInputState("success")
        
        if (mode === 'signup') {
            await onLoginSubmit(credentials)
            return
        }
        
        updateOnboardingState('resetToken', response.data.data.resetToken)
        showToast({ type: "success", message: "Code verified successfully" })
        onNext?.()
    }

    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: services.verify,
        onSuccess: handleVerifySuccess,
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
        queryFn: services.resend,
        enabled: false,
        onSettled: () => {
            setInputState("default")
            setOtp("")
        },
        onSuccess: () => {
            showToast({ type: "success", message: "Verification code sent to your email" })
        },
        onError: (error: any) => {
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
