import { Box, Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import OnboardingHeader from './components/OnboardingHeader'
import OnboardingStepContent from './components/OnboardingStepContent'
import ProductCards from './components/product-cards/ProductCards'
import ShopPreview from './components/shop-preview/ShopPreview'
import useOnboardingStore from './store/useOnboardingStore'

function Onboarding() {
    const { currentStep } = useOnboardingStore()

    function renderRightContent() {
        if (currentStep >= 0 && currentStep <= 2) return <ProductCards />
        if (currentStep === 3) return <ShopPreview />
        if (currentStep === 4 || currentStep === 5 || currentStep === 6) {
            return <Box>Simple Image Placeholder</Box>
        }
        return null
    }

    const hasRightSection = currentStep !== 7
    const rightContent = renderRightContent()

    return (
        <Grid templateColumns={hasRightSection ? '1fr 1.5fr' : '1fr'}>
            <Flex direction="column" gap={12} padding={16}>
                <OnboardingHeader />
                <OnboardingStepContent />
            </Flex>

            {hasRightSection && rightContent && (
                <Box
                    padding="80px"
                    bg="linear-gradient(180deg, #1C1C1C 0%, #141414 100%)"
                >
                    {rightContent}
                </Box>
            )}
        </Grid>
    )
}

export default Onboarding