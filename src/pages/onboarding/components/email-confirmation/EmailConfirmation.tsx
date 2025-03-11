import { Box, Flex, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import InteractiveText from '../common/InteractiveText'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import OtpField from './OtpField'

function EmailConfirmation({ onBack, onNext }: OnboardingStepProps) {
    const [otp, setOtp] = useState("")

    const handleResend = () => alert("Resend code")

    const handleVerify = () => onNext()

    return (
        <>
            <OnboardingStepHeader
                heading='Confirm Email'
                description='Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox.'
            />

            <Flex direction="column">
                <OtpField onChange={(value) => setOtp(value)} value={otp} state='default' />

                <Button fontWeight={500} isDisabled={otp.length < 5} onClick={handleVerify}>
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
                    <Text>
                        Didn’t receive the code? {" "}
                        <InteractiveText onClick={handleResend}>Resend</InteractiveText>
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