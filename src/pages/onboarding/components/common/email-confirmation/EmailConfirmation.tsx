import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React from 'react'
import OnboardingStepHeader from '../OnboardingStepHeader'
import OtpField from './OtpField'
import { useEmailVerification } from 'pages/onboarding/hooks/useEmailVerification'

interface EmailConfirmationProps {
    mode: 'signup' | 'reset';
    onBack: () => void;
    onNext?: () => void;
}

function EmailConfirmation({mode, onBack, onNext}: EmailConfirmationProps) {
    const {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading,
        resendLoading,
        loginLoading
    } = useEmailVerification({ mode, onNext })
  
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
                        Didn't receive the code? {" "}
                        <InteractiveText onClick={() => resendCode()}>
                            {resendLoading ? <Spinner color='#fff' size="xs" /> : "Resend"}
                        </InteractiveText>
                    </Text>

                    <Text display={'flex'} gap={1} marginTop={2}>
                        Want to change your email address? {" "}
                        <InteractiveText onClick={onBack}>Go back</InteractiveText>
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default EmailConfirmation