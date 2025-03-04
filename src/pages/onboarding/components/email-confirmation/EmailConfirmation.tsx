import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import OtpField from './OtpField'
import InteractiveText from '../InteractiveText'

interface Props {
    onNext: () => void
    onBack: () => void
}

function EmailConfirmation({ onBack, onNext }: Props) {
    const [otp, setOtp] = React.useState("");

    const handleResend = () => {
        alert("Resend code");
    }

    return (
        <Flex flexDirection={"column"} gap={{ base: "2px", md: 1 }}>
            <Text
                color={"#fff"}
                fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                fontWeight={700}
            >
                Confirm Email
            </Text>
            <Text
                color={"#B1B1B1"}
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
            >
                Verify the code received in your inbox below, be sure to check the spam folder in case you do not see it in your primary inbox.
            </Text>

            <OtpField onChange={(value) => setOtp(value)} value={otp} state='default' />


            <Button onClick={onNext} fontWeight={500}>Verify</Button>

            <Flex flexDirection={"column"} gap={2} mt={6}>
                <Text textAlign="start" fontSize={14} color="#FFF">
                    Didn’t receive the code? {" "}
                    <InteractiveText onClick={handleResend}>Resend</InteractiveText>
                </Text>
                <Text textAlign="start" fontSize={14} color="#FFF">
                    Want to change your email address? {" "}
                    <InteractiveText onClick={onBack}>Go back</InteractiveText>
                </Text>
            </Flex>
        </Flex>
    )
}

export default EmailConfirmation