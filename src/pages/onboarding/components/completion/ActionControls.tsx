import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    currentSlideIndex: number
    handlePreviousAction: () => void
    handleNextAction: () => void
    onDotClick: (index: number) => void
}

function ActionControls({ currentSlideIndex, handlePreviousAction, handleNextAction, onDotClick }: Props) {
    const { t } = useLocaleResources('onboarding')

    const renderDots = () => [...Array(2)].map((_, index) => {
        const isActive = index === currentSlideIndex;
        return (
            <Box
                key={index}
                w={isActive ? "24px" : "6px"}
                h="6px"
                borderRadius="4px"
                bg={isActive ? "#FFF" : "#3C3C3C"}
                cursor="pointer"
                transition="0.3s"
                onClick={() => onDotClick(index)}
            />
        )
    })

    return (
        <Flex position="relative" justifyContent="space-between" alignItems="center" gap={{ base: 4 }}>
            <AppButton variant="secondary" onClick={handlePreviousAction}>
                {currentSlideIndex === 0 ? t('common:back') : t('common:previous')}
            </AppButton>

            <AbsoluteCenter display={{ base: "none", md: "flex" }} gap="6px">
                {renderDots()}
            </AbsoluteCenter>

            <AppButton flex={{ base: 1, md: 'unset' }} onClick={handleNextAction}>
                {currentSlideIndex === 0 ? t('common:next') : t('CompletionSection.controls.startExploring')}
            </AppButton>
        </Flex>
    )
}

export default ActionControls