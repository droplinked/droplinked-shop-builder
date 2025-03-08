import { Box, Flex, Grid } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import useOnboardingStore from '../store/useOnboardingStore'
import OnboardingHeader from './OnboardingHeader'
import OnboardingStepHeader from './OnboardingStepHeader'
import ProductCards from './product-cards/ProductCards'
import ShopPreview from './shop-preview/ShopPreview'

interface Props extends PropsWithChildren {
    currentStep: number
}

function OnboardingStepWrapper({ currentStep, children }: Props) {
    const { stepData } = useOnboardingStore()
    const { heading, description } = stepData[currentStep] || {}

    const renderRightSectionContent = () => {
        if (currentStep >= 0 && currentStep <= 2) return <ProductCards />
        if (currentStep === 3) return <ShopPreview />
        if (currentStep === 4 || currentStep === 5 || currentStep === 6) {
            return <Box>Simple Image Placeholder</Box>
        }
        return null
    }

    const rightSectionContent = renderRightSectionContent()

    return (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1.5fr" }}>
            <Flex direction="column" gap={12} padding={16}>
                <OnboardingHeader />
                <OnboardingStepHeader heading={heading} description={description} />
                <Box>{children}</Box>
            </Flex>
            {rightSectionContent && (
                <Box
                    padding="80px"
                    bg="linear-gradient(180deg, #1C1C1C 0%, #141414 100%)"
                >
                    {rightSectionContent}
                </Box>
            )}
        </Grid>
    )
}

export default OnboardingStepWrapper