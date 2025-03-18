import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useEffect, useState } from 'react'
import InteractiveText from '../common/InteractiveText'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import OtpField from './OtpField'
import { resendEmailService, verifyEmailCode } from 'lib/apis/user/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { useMutation } from 'react-query'
import useAppToast from 'hooks/toast/useToast'

interface InputStates {
    state: 'default' | 'error' | 'success'
}

function EmailConfirmation({ onBack, onNext }: OnboardingStepProps) {
    const [otp, setOtp] = useState("")
    const [inputState, setInputState] = useState<InputStates["state"]>("default")
    const { email } = useOnboardingStore()
    const { showToast } = useAppToast()

    const { mutateAsync: handleVerifyEmail, isLoading: verifyLoading } = useMutation(() => verifyEmailCode({ code: otp, email }))
    const { mutateAsync: handleResendCode, isLoading: resendLoading } = useMutation(() => resendEmailService({ email }))

    const isLoading = verifyLoading || resendLoading

    const handleResend = async () => {
        try {
            await handleResendCode()
            setInputState("default")
            setOtp("")
        } catch (error) {
            showToast({ type: "error", message: "Failed to resend code" })
        }
    }

    const handleVerify = async () => {
        try {
            await handleVerifyEmail()
            setInputState("success")
            setTimeout(() => {
                onNext()
            }, 2000)
        } catch (error) {
            setInputState("error")
        }
    }

    useEffect(() => {
        setInputState("default")
    }, [otp])

    return (
        <>
            <OnboardingStepHeader
                heading='Confirm Email'
                description='Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox.'
            />

            <Flex direction="column">
                <OtpField onChange={(value) => setOtp(value)} value={otp} state={inputState} isLoading={isLoading} />

                <Button
                    fontWeight={500}
                    isDisabled={otp.length < 5 || inputState === "success"}
                    onClick={handleVerify}
                    isLoading={isLoading}
                >
                    Verify
                </Button>

                <Box
                    marginTop={6}
                    sx={{
                        "p": {
                            color: "#FFF",
                            fontSize: 14
                        }
                    }}
                >
                    <Text display="flex" alignItems="end" gap={1}>
                        Didn’t receive the code? {" "}
                        <InteractiveText onClick={handleResend}>
                            {resendLoading ? <Spinner color='#fff' size="xs" /> : "Resend"}
                        </InteractiveText>
                    </Text>

                    <Text marginTop={2}>
                        Want to change your email address? {" "}
                        <InteractiveText onClick={onBack}>Go back</InteractiveText>
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default EmailConfirmation