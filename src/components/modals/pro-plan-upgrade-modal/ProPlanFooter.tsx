import { Box, Flex, Text } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import InteractiveText from 'components/redesign/interactive-text/InteractiveText';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ProPlanFooterProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const ProPlanFooter: React.FC<ProPlanFooterProps> = ({ isCrossmint, canActivateTrial, onClose, onUpgrade }) => {
  const { t } = useLocaleResources('common');

  const getButtonText = () => {
    if (isCrossmint) return t('proPlan.footer.continue');
    if (canActivateTrial) return t('proPlan.footer.claimTrial');
    return t('proPlan.footer.upgrade');
  };

  return (
    <>
      {canActivateTrial ? null : (
        <Text display="flex" fontSize="sm" justifyContent="center" alignItems="center" gap={1} mt={6} color="white">
          {' '}
          {t('proPlan.footer.unsure')} <InteractiveText to="/plans" target="_blank" rel="noopener noreferrer">
            {t('proPlan.footer.comparePlans')}
          </InteractiveText>
        </Text>
      )}

      <Box mt={9} w="full" h="0" border="1px solid" borderColor="neutral.gray.900" />

      <Flex py={9} px={12} gap={4} w="full">
        <AppButton variant="secondary" onClick={onClose}>
          {!canActivateTrial ? t('proPlan.footer.keepCurrentPlan') : t('proPlan.footer.close')}
        </AppButton>
        <AppButton flex={1} onClick={onUpgrade}>
          {getButtonText()}
        </AppButton>
      </Flex>
    </>
  );
};

export default ProPlanFooter;