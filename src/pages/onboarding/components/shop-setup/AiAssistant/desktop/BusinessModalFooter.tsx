import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    onClose: () => void
    onNextStep: () => void
    generateWithAiData: GenerateWithAiData
}

export default function BusinessModalFooter({ onClose, onNextStep, generateWithAiData }: Props) {
    const { t } = useLocaleResources('onboarding')
    const isDisabled = !generateWithAiData.businessDescribe || !generateWithAiData.businessCategory

    return (
        <Flex borderTop="1px solid #292929" paddingInline="48px" paddingBlock="36px" justifyContent="space-between">
            <AppButton
                variant="secondary"
                onClick={onClose}
            >
                {t('common.buttons.discard')}
            </AppButton>
            <AppButton
                onClick={onNextStep}
                isDisabled={isDisabled}
            >
                {t('aiAssistant.businessModal.generateButton')}
            </AppButton>
        </Flex>
    )
}
