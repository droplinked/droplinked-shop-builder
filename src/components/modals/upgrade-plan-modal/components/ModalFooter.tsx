import { Box, Flex } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { PlanType } from '../types/upgradePlan.types';
import { getUpgradePlanTexts } from '../utils/upgradePlanUtils';

interface ModalFooterProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  activeTab: PlanType;
  onClose: () => void;
  onUpgrade: () => void;
  isSubmitting?: boolean;
}

export default function ModalFooter({
  isCrossmint,
  canActivateTrial,
  activeTab,
  onClose,
  onUpgrade,
  isSubmitting = false
}: ModalFooterProps) {
  const { t } = useLocaleResources('common');
  const { saveButtonText, discardButtonText } = getUpgradePlanTexts(
    activeTab,
    isCrossmint,
    canActivateTrial,
    t
  );

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
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText={isSubmitting ? t('UpgradePlanModal.useUpgradePlan.submittingText') : undefined}
        >
          {saveButtonText}
        </AppButton>
      </Flex>
    </>
  );
}
