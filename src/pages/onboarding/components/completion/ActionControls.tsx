import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    currentSlideIndex: number
    handlePreviousAction: () => void
    handleNextAction: () => void
}

function ActionControls({ currentSlideIndex, handlePreviousAction, handleNextAction }: Props) {
    return (
        <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Button
                variant="secondary"
                colorScheme="gray"
                onClick={handlePreviousAction}
            >
                {currentSlideIndex === 0 ? 'Back' : 'Prev'}
            </Button>
            <Button onClick={handleNextAction}>
                {currentSlideIndex === 0 ? 'Next' : 'Start Exploring Dashboard'}
            </Button>
        </Flex>
    )
}

export default ActionControls