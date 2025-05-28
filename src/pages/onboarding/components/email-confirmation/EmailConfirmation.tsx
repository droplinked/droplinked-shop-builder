import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import OtpField from './OtpField'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

function EmailConfirmation({ onBack }: OnboardingStepProps) {
    const {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading,
        resendLoading,
        loginLoading
    } = useEmailVerification()

    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

    return (
        <>
            <OnboardingStepHeader
                heading={t('emailConfirmation.title')}
                description={t('emailConfirmation.subtitle')}
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
                    {t('emailConfirmation.verifyButton')}
                </AppButton>

                <Box
                    marginTop={6}
                    sx={{ "p": { color: "#FFF", fontSize: 14 } }}
                >
                    <Text display="flex" gap={1}>
                        {t('emailConfirmation.noCodeText')}{" "}
                        <InteractiveText onClick={resendCode}>
                            {resendLoading ? <Spinner color='#fff' size="xs" /> : t('emailConfirmation.resendButton')}
                        </InteractiveText>
                    </Text>

                    <Text display={'flex'} gap={1} marginTop={2}>
                        {t('emailConfirmation.changeEmailText')}{" "}
                        <InteractiveText onClick={onBack}>{t('emailConfirmation.goBackButton')}</InteractiveText>
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default EmailConfirmation