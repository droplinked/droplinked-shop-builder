import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'

interface Props {
    onNextStep: () => void
    onClose: () => void
    generateWithAiData: GenerateWithAiData
}

export default function BusinessModalFooter({ onNextStep, onClose, generateWithAiData }: Props) {
    const isDisabled = !generateWithAiData.businessCategory || !generateWithAiData.businessDescribe

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
                isDisabled={isDisabled}
            >
                Generate Shop Details with AI
            </Button>
        </Flex>
    )
}
