import { Flex, Grid } from '@chakra-ui/react'
import { LayoutProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import OnboardingPageHeader from '../common/OnboardingPageHeader'

function DesktopLayout({ leftContent, rightContent }: LayoutProps) {
    return (
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1fr 1.5fr', '3xl': '1fr 2fr' }}>
            <Flex direction="column" gap={12} padding={{ lg: "36px", xl: "48px", "3xl": "64px" }}>
                <OnboardingPageHeader />
                {leftContent}
            </Flex>
            {rightContent}
        </Grid>
    )
}

export default DesktopLayout