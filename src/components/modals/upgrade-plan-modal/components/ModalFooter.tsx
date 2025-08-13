import { Box, Flex } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { PlanFooterProps } from '../types/upgradePlan.types';
import { getUpgradePlanTexts } from '../utils/upgradePlanUtils';

export default function PlanFooter({
  isCrossmint,
  canActivateTrial,
  activeTab,
  onClose,
  onUpgrade,
  isSubmitting = false
}: PlanFooterProps & {
  isSubmitting?: boolean;
}) {
  const { t } = useLocaleResources('common');
  
  const { saveButtonText, discardButtonText } = getUpgradePlanTexts(
    activeTab,
    isCrossmint,
    canActivateTrial,
    t
  );

  // Button is only disabled when submitting, not when form is invalid
  const isButtonDisabled = isSubmitting;

  return (
    <>
      <Box w="full" h="0" border="1px solid" borderColor="neutral.gray.900" />

      <Flex py={9} px={12} gap={4} w="full">
        <AppButton variant="secondary" onClick={onClose} isDisabled={isSubmitting}>
          {discardButtonText}
        </AppButton>
        <AppButton 
          flex={1} 
          onClick={onUpgrade}
          isDisabled={isButtonDisabled}
          isLoading={isSubmitting}
          loadingText={isSubmitting ? "Submitting..." : undefined}
        >
          {saveButtonText}
        </AppButton>
      </Flex>
    </>
  );
}
