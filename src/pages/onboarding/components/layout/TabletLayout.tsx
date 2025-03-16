import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import OnboardingPageHeader from '../common/OnboardingPageHeader'
import { LayoutProps } from 'pages/onboarding/types/onboarding'

function TabletLayout({ leftContent, rightContent }: LayoutProps) {
    return (
        <Box
            height="100dvh"
            padding={6}
            bgImage="url('https://upload-file-droplinked.s3.amazonaws.com/7ff3462bc4e35c7199627f5817a9b8e3d96c2f44baa405af4b53a4422d4d6278.png')"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Flex
                height="100%"
                direction="column"
                gap={9}
                borderRadius={16}
                padding={6}
                bgColor="neutral.background"
            >
                <OnboardingPageHeader />
                {leftContent}
            </Flex>
        </Box>
    )
}

export default TabletLayout