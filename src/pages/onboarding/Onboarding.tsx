import { Box, Flex, Grid } from '@chakra-ui/react'
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
        if (currentStep === 3) return <ShopPreview />
        if (currentStep === 4 || currentStep === 5 || currentStep === 6) {
            return <Box>Simple Image Placeholder</Box>
        }
        return null
    }

    const hasRightSection = currentStep !== 7
    const rightContent = renderRightContent()

    return (
        <Grid templateColumns={hasRightSection ? '1fr 1fr' : '1fr'}>
            <Flex direction="column" gap={12} padding={16}>
                <OnboardingHeader />
                <OnboardingStepContent
                    step={currentStep}
                    data={stepData[currentStep]}
                    onNext={nextStep}
                    onBack={prevStep}
                    shopData={shopData}
                    updateShopData={updateShopData}
                />
            </Flex>

            {hasRightSection && rightContent && (
                <Box>
                    {rightContent}
                </Box>
            )}
        </Grid>
    )
}

export default Onboarding