import { Flex, Grid } from '@chakra-ui/react'
import { LayoutProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import DroplinkedBrand from '../common/DroplinkedBrand'
import OnboardingPageHeader from '../common/OnboardingPageHeader'

function MobileLayout({ leftContent, isAuthStep }: LayoutProps) {
    return (
        <>
            {isAuthStep
                ? <Grid
                    height="245px"
                    placeContent="center"
                    bgImage="url('https://upload-file-droplinked.s3.amazonaws.com/7ff3462bc4e35c7199627f5817a9b8e3d96c2f44baa405af4b53a4422d4d6278.png')"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                >
                    <DroplinkedBrand />
                </Grid>
                : null
            }
            <Flex direction="column" gap={isAuthStep ? 6 : 9} padding={4}>
                {!isAuthStep && <OnboardingPageHeader />}
                {leftContent}
            </Flex>
        </>
    )
}

export default MobileLayout