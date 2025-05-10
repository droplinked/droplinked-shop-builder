import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

interface Props {
    onNextStep: () => void
    onClose: () => void
    selectedPlan: string
}

export default function PlansModalFooter({ onNextStep, onClose, selectedPlan }: Props) {
    return (
        <Flex borderTop="1px solid #292929" paddingInline="48px" paddingBlock="36px" justifyContent="space-between">
            <AppButton
                variant='secondary'
                onClick={onClose}
            >
                Close
            </AppButton>
            <AppButton
                onClick={onNextStep}
                isDisabled={!selectedPlan}
            >
                {selectedPlan === "Monthly" || !selectedPlan ? "Claim Trial Now" : "Subscribe"}
            </AppButton>
        </Flex>
    )
}
