import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import OtpField from './OtpField'

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

    return (
        <>
            <OnboardingStepHeader
                heading='Confirm Email'
                description='Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox.'
            />

            <Flex direction="column">
                <OtpField
                    onChange={(value) => onOtpChange(value)}
                    value={otp}
                    state={inputState}
                    isLoading={verifyLoading || resendLoading || loginLoading}
                />

                <Button
                    fontWeight={500}
                    isDisabled={otp.length < 6 || inputState === "success" || resendLoading}
                    onClick={() => verifyEmail()}
                    isLoading={verifyLoading || loginLoading}
                >
                    Verify
                </Button>

                <Box
                    marginTop={6}
                    sx={{ "p": { color: "#FFF", fontSize: 14 } }}
                >
                    <Text display="flex" alignItems="end" gap={1}>
                        Didn’t receive the code? {" "}
                        <InteractiveText onClick={resendCode}>
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