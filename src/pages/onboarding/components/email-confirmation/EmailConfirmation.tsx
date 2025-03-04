import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import InteractiveText from '../InteractiveText'
import OtpField from './OtpField'
import StepWrapper from '../StepWrapper'

interface Props {
    onNext: () => void
    onBack: () => void
}

function EmailConfirmation({ onBack, onNext }: Props) {
    const [otp, setOtp] = React.useState("")

    const handleResend = () => {
        alert("Resend code")
    }

    const handleVerify = () => {
        alert("entered Code " + otp)
        onNext()
    }

    return (
        <StepWrapper
            heading="Confirm Email"
            description="Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox."
        >
            <OtpField onChange={(value) => setOtp(value)} value={otp} state='default' />

            <Button disabled={otp.length < 5} onClick={handleVerify} fontWeight={500}>Verify</Button>

            <Flex
                flexDirection="column"
                gap={2}
            >
                <Text
                    marginBottom={2}
                    textAlign="start"
                    fontSize={14}
                    color="#FFF"
                >
                    Didn’t receive the code? {" "}
                    <InteractiveText onClick={handleResend}>Resend</InteractiveText>
                </Text>
                <Text
                    textAlign="start"
                    fontSize={14}
                    color="#FFF"
                >
                    Want to change your email address? {" "}
                    <InteractiveText onClick={onBack}>Go back</InteractiveText>
                </Text>
            </Flex>
        </StepWrapper>
    )
}

export default EmailConfirmation