import { Flex, Spinner } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useEffect } from 'react'
import AuthRedirectLink from '../AuthRedirectLink'
import OnboardingStepHeader from '../OnboardingStepHeader'
import OtpField from './OtpField'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface EmailConfirmationProps {
    mode: 'signup' | 'reset'
}

function EmailConfirmation({ mode }: EmailConfirmationProps) {
    const { updateOnboardingState } = useOnboardingStore()
    const { otp, inputState, onOtpChange, verifyEmail, resendCode, verifyLoading, resendLoading, loginLoading } = useEmailVerification({ mode })
    const { t } = useLocaleResources('onboarding')

    useEffect(() => {
        if (mode === 'signup') resendCode()
    }, [mode, resendCode])

    return (
        <>
            <OnboardingStepHeader
                heading={t('emailConfirmation.title')}
                description={t('emailConfirmation.description')}
            />

            <Flex direction="column">
                <OtpField
                    onChange={(value) => onOtpChange(value)}
                    value={otp}
                    state={inputState}
                    isLoading={verifyLoading || resendLoading || loginLoading}
                />

                <AppButton
                    isDisabled={otp.length < 6 || inputState === "success" || resendLoading}
                    onClick={() => verifyEmail()}
                    isLoading={verifyLoading || loginLoading}
                >
                    Verify
                </AppButton>

                <Flex direction="column" gap={2} marginTop={6}>
                    <AuthRedirectLink
                        text="Didn't receive the code?"
                        linkText={resendLoading ? <Spinner color='#fff' size="xs" /> : "Resend"}
                        action={resendCode}
                    />

                    <AuthRedirectLink
                        text="Want to change your email address?"
                        linkText="Go back"
                        action={() => updateOnboardingState('currentStep', mode === 'signup' ? 'SIGN_UP' : 'RESET_PASSWORD')}
                    />
                </Flex>
            </Flex>
        </>
    )
}

export default EmailConfirmation