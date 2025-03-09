import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    onNextStep: () => void
    onClose: () => void
    selectedPlan: string
}

export default function PlansModalFooter({ onNextStep, onClose, selectedPlan }: Props) {
    return (
        <Flex borderTop="1px solid #292929" paddingInline="48px" paddingBlock="36px" justifyContent="space-between">
            <Button
                variant='secondary'
                onClick={onClose}
                fontSize="14px"
                fontWeight="500"
            >
                Close
            </Button>
            <Button
                fontSize="14px"
                fontWeight="500"
                onClick={onNextStep}
                isDisabled={!selectedPlan}
            >
                {selectedPlan === "Monthly" || !selectedPlan ? "Claim Trial Now" : "Subscribe"}
            </Button>
        </Flex>
    )
}
