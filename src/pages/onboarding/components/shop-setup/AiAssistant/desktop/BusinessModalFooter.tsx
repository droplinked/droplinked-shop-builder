import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    onNextStep: () => void
    onClose: () => void
}

export default function BusinessModalFooter({ onNextStep, onClose }: Props) {
    return (
        <Flex borderTop="1px solid #292929" paddingInline="48px" paddingBlock="36px" justifyContent="space-between">
            <Button
                variant='secondary'
                onClick={onClose}
                fontSize="14px"
                fontWeight="500"
            >
                Discard
            </Button>
            <Button
                fontSize="14px"
                fontWeight="500"
                onClick={onNextStep}
            >
                Generate Shop Details with AI
            </Button>
        </Flex>
    )
}
