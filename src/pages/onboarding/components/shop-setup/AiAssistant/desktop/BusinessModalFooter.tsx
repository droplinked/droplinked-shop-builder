import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
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
            <AppButton
                variant='secondary'
                onClick={onClose}
            >
                Discard
            </AppButton>
            <AppButton
                onClick={onNextStep}
                isDisabled={isDisabled}
            >
                Generate Shop Details with AI
            </AppButton>
        </Flex>
    )
}
