import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { verifyEmailCode, resendEmailService } from 'lib/apis/user/services'
import useAppToast from 'hooks/toast/useToast'
import { useLogin } from './useLogin'
import useOnboardingStore from '../stores/useOnboardingStore'

export const useEmailVerification = () => {
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<'default' | 'error' | 'success'>("default")
    const { credentials } = useOnboardingStore()
    const { onLoginSubmit, loading: loginLoading } = useLogin()
    const { showToast } = useAppToast()

    const { mutateAsync: verifyEmail, isLoading: verifyLoading } = useMutation({
        mutationFn: () => verifyEmailCode({ code: otp, email: credentials.email }),
        onSuccess: async () => {
            setInputState("success")
            await onLoginSubmit(credentials)
        },
        onError() {
            setInputState("error")
        }
    })

    const { refetch: resendCode, isLoading: resendLoading } = useQuery({
        queryKey: ["resend-email-code"],
        queryFn: () => resendEmailService({ email: credentials.email }),
        onSettled() {
            setInputState("default")
            setOtp("")
        },
        onError() {
            showToast({ type: "error", message: "Failed to resend code" })
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
