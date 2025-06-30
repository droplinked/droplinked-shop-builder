import { Box, Flex, Text } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import React from 'react';

interface ProPlanFooterProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const ProPlanFooter: React.FC<ProPlanFooterProps> = ({ isCrossmint, canActivateTrial, onClose, onUpgrade }) => {
  const getButtonText = () => {
    if (isCrossmint) return 'Continue';
    if (canActivateTrial) return 'Claim Trial Now';
    return 'Upgrade';
  };

  return (
    <>
      {canActivateTrial ? null : (
        <Text display="flex" fontSize="sm" justifyContent="center" alignItems="center" gap={1} mt={6} color="white">
          {' '}
          Still unsure? <ExternalLink onClick={() => window.open('/plans', '_blank')}>Compare plans and pricing options</ExternalLink>
        </Text>
      )}

      <Box mt={9} w="full" h="0" border="1px solid" borderColor="neutral.gray.900" />

      <Flex py={9} px={12} gap={4} w="full">
        <AppButton variant="secondary" onClick={onClose}>
          {!canActivateTrial ? 'Keep Current Plan' : 'Close'}
        </AppButton>
        <AppButton flex={1} onClick={onUpgrade}>
          {getButtonText()}
        </AppButton>
      </Flex>
    </>
  );
};

export default ProPlanFooter; 