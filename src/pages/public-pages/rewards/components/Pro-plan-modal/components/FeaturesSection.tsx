import { Badge, Flex, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/rewards/en.json';
import localAr from 'locales/rewards/ar.json';

const FeaturesSection = () => {
  const { t } = useLocaleResources('rewards', { en: localEn, ar: localAr });

  const features = [
    { icon: <AppIcons.Secure color="#2BCFA1" />, text: t('proPlanModal.features.proAccess') },
    { icon: <AppIcons.GreenSpeedometer color="#2BCFA1" />, text: t('proPlanModal.features.cancelAnytime') },
    { icon: <AppIcons.Refresh color='#2BCFA1' style={{ height: '16px', width: '16px' }} />, text: t('proPlanModal.features.seamlessActivation') }
  ];

  return (
    <Flex px={12} py={4} gap={4} justify="space-between" direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', sm: 'start' }}>
      {features.map(({ icon, text }, index) => (
        <Flex key={index} gap={4} direction={{ base: 'row', md: 'column' }} align="center" justify="center" flex={1}>
          <Badge p={2} bg="rgba(43, 206, 161, 0.1)" rounded="full" color="rgba(43, 206, 161)">
            {icon}
          </Badge>
          <Text fontSize="sm" color="white" textAlign="center">
            {text}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default FeaturesSection;
