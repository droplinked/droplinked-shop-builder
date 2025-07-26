import { Flex } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import DroplinkedBrand from '../common/DroplinkedBrand'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import CompletionSlider from './CompletionSlider'

function CompletionSection() {
    const { t } = useLocaleResources('onboarding')

    return (
        <Flex
            minHeight="100vh"
            direction="column"
            alignItems="center"
            gap={{ base: 9, xl: 12 }}
            padding={{ base: 4, md: 6, lg: 9, xl: 12, '3xl': 16 }}
        >
            <DroplinkedBrand />
            <OnboardingStepHeader
                heading={t('CompletionSection.title')}
                description={t('CompletionSection.subtitle')}
                textAlign="center"
            />

            <CompletionSlider />
        </Flex>
    )
}

export default CompletionSection