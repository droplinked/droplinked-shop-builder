import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    currentSlideIndex: number
    handlePreviousAction: () => void
    handleNextAction: () => void
    onDotClick: (index: number) => void
}

function ActionControls({ currentSlideIndex, handlePreviousAction, handleNextAction, onDotClick }: Props) {
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
        <Flex position="relative" justifyContent="space-between" alignItems="center">
            <Button variant="secondary" onClick={handlePreviousAction}>
                {currentSlideIndex === 0 ? 'Back' : 'Prev'}
            </Button>

            <AbsoluteCenter display="flex" gap="6px">
                {renderDots()}
            </AbsoluteCenter>

            <Button onClick={handleNextAction}>
                {currentSlideIndex === 0 ? 'Next' : 'Start Exploring Dashboard'}
            </Button>
        </Flex>
    )
}

export default ActionControls