import { Flex, Heading, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import Lottie from 'lottie-react'
import { DesktopOnlyNoticePayload } from 'pages/template-designer/data/DesktopOnlyNoticePayload'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function DesktopOnlyNotice() {
    const navigate = useNavigate()

    return (
        <Flex
            direction="column"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            style={{ direction: "ltr" }}
        >
            <Lottie animationData={DesktopOnlyNoticePayload} loop={false} />

            <Heading
                as="h2"
                textAlign="center"
                marginTop={9}
                fontSize={18}
                color="text.white"
            >
                Best Viewed on Desktop
            </Heading>

            <Text
                textAlign="center"
                marginTop={2}
                fontSize={14}
                color="text.subtext.placeholder.light"
            >
                To begin editing, please use a desktop to continue.
            </Text>

            <AppButton
                marginTop={4}
                variant="normal"
                onClick={() => navigate(-1)}
            >
                Return
            </AppButton>
        </Flex>
    )
}

export default DesktopOnlyNotice