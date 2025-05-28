import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    onNextStep: () => void
    onClose: () => void
    selectedPlan: string
}

export default function PlansModalFooter({ onNextStep, onClose, selectedPlan }: Props) {
    const { t } = useLocaleResources('onboarding')

    return (
        <Flex borderTop="1px solid #292929" paddingInline="48px" paddingBlock="36px" justifyContent="space-between">
            <AppButton
                variant="secondary"
                onClick={onClose}
            >
                {t('common.buttons.close')}
            </AppButton>
            <AppButton
                onClick={onNextStep}
                isDisabled={!selectedPlan}
            >
                {selectedPlan === "Monthly" || !selectedPlan 
                    ? t('aiAssistant.plansModal.buttons.claimTrial')
                    : t('aiAssistant.plansModal.buttons.subscribe')
                }
            </AppButton>
        </Flex>
    )
}
