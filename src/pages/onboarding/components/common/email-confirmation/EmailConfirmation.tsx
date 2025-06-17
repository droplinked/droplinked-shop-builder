import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'
import React from 'react'
import OtpField from './OtpField'
import OnboardingStepHeader from '../OnboardingStepHeader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'

function EmailConfirmation() {
    const {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading,
        resendLoading,
        loginLoading
    } = useEmailVerification({ mode: 'signup' })
    
    const { t } = useLocaleResources('onboarding')
    const { updateOnboardingState } = useOnboardingStore()


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

                <Box
                    marginTop={6}
                    sx={{ "p": { color: "#FFF", fontSize: 14 } }}
                >
                    <Text display="flex" gap={1}>
                        Didn’t receive the code? {" "}
                        <InteractiveText onClick={resendCode}>
                            {resendLoading ? <Spinner color='#fff' size="xs" /> : "Resend"}
                        </InteractiveText>
                    </Text>

                    <Text display={'flex'} gap={1} marginTop={2}>
                        Want to change your email address? {" "}
                        <InteractiveText onClick={() => updateOnboardingState('currentStep', 'SIGN_UP')}>{t('emailConfirmation.goBack')}</InteractiveText>
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default EmailConfirmation