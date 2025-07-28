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
            height="100%"
            direction='column'
            justifyContent='center'
            alignItems='center'
        >
            <Lottie animationData={DesktopOnlyNoticePayload} loop={false} />

            <Heading
                as='h2'
                marginTop={9}
                textAlign='center'
                fontSize={18}
                color="text.white"
            >
                Best Viewed on Desktop
            </Heading>

            <Text
                marginTop={2}
                textAlign='center'
                fontSize={14}
                color="text.subtext.placeholder.light"
            >
                To begin editing, please use a desktop to continue.
            </Text>

            <AppButton
                marginTop={4}
                variant='normal'
                onClick={() => navigate(-1)}
            >
                Return
            </AppButton>
        </Flex>
    )
}

export default DesktopOnlyNotice