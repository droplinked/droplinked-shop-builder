import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import InteractiveText from '../InteractiveText'
import OtpField from './OtpField'

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
        <>
            <OtpField onChange={(value) => setOtp(value)} value={otp} state='default' />

            <Button
                w="full"
                fontWeight={500}
                isDisabled={otp.length < 5}
                onClick={handleVerify}
            >
                Verify
            </Button>

            <Flex marginTop={6} flexDirection="column" gap={2}>
                <Text textAlign="start" fontSize={14} color="#FFF">
                    Didn’t receive the code? {" "}
                    <InteractiveText onClick={handleResend}>Resend</InteractiveText>
                </Text>

                <Text textAlign="start" fontSize={14} color="#FFF">
                    Want to change your email address? {" "}
                    <InteractiveText onClick={onBack}>Go back</InteractiveText>
                </Text>
            </Flex>
        </>
    )
}

export default EmailConfirmation