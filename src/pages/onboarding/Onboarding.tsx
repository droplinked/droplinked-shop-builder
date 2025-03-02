import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import OnboardingHeader from './components/OnboardingHeader'
import OnboardingStepContent from './components/OnboardingStepContent'
import ProductCards from './components/ProductCards'
import ShopPreview from './components/shop-preview/ShopPreview'
import { useOnboarding } from './hooks/useOnboarding'

function Onboarding() {
    const { currentStep, stepData, shopData, updateShopData, nextStep, prevStep } = useOnboarding()

    function renderRightContent() {
        if (currentStep >= 0 && currentStep <= 2) return <ProductCards />
        if (currentStep === 4) return <ShopPreview />
        if (currentStep === 3 || currentStep === 5 || currentStep === 6) {
            return <Box>Simple Image Placeholder</Box>
        }
        return null
    }

    const hasRightSection = currentStep !== 7
    const rightContent = renderRightContent()

    return (
        <Grid
            templateColumns={hasRightSection ? '1fr 1fr' : '1fr'}
            minHeight="100vh"
            bg="gray.50"
            gap={8}
            p={8}
        >
            <GridItem>
                <Box maxW="container.sm" mx="auto">
                    <OnboardingHeader />
                    <OnboardingStepContent
                        step={currentStep}
                        data={stepData[currentStep]}
                        onNext={nextStep}
                        onBack={prevStep}
                        shopData={shopData}
                        updateShopData={updateShopData}
                    />
                </Box>
            </GridItem>
            {hasRightSection && rightContent && (
                <GridItem>
                    <Box maxW="container.sm" mx="auto">
                        {rightContent}
                    </Box>
                </GridItem>
            )}
        </Grid>
    )
}

export default Onboarding