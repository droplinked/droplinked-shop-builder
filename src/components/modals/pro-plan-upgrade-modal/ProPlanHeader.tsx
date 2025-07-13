import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { MedalstarLg } from 'assets/icons/System/MedalStar/MedalstarLg';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ProPlanHeaderProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
}

const ProPlanHeader: React.FC<ProPlanHeaderProps> = ({ isCrossmint, canActivateTrial }) => {
  const { t } = useLocaleResources('common');

  const getTitle = () => {
    if (isCrossmint) return t('proPlan.crossmint.title');
    if (canActivateTrial) return t('proPlan.trial.title');
    return t('proPlan.upgrade.title');
  };

  const getDescription = () => {
    if (isCrossmint) return t('proPlan.crossmint.description');
    if (canActivateTrial) return t('proPlan.trial.description');
    return t('proPlan.upgrade.description');
  };

  return (
    <Box w="100%">
      <Image src="https://upload-file-droplinked.s3.amazonaws.com/a8127623df1b0dc11be743677f3ca3c1eb5c0d2251d5801eb61a96835ac39ce9.png" position="absolute" />
      <Flex p={12} flexDirection="column" justifyContent="center" alignItems="center" gap={2} position="relative" zIndex={2}>
        <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
          <MedalstarLg color="#2BCFA1" />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {getTitle()}
        </Text>
        <Text fontSize="md" color="text.subtext.placeholder.light" textAlign="center">
          {getDescription()}
        </Text>
      </Flex>
    </Box>
  );
};

export default ProPlanHeader; 