import { Box, Flex, Image, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/rewards/en.json';
import localAr from 'locales/rewards/ar.json';

export const ModalHeader = () => {
  const { t } = useLocaleResources('rewards', { en: localEn, ar: localAr });

  return (
    <Box position="relative" mb={2} w="100%" maxHeight="200px">
      <Image src="/assets/images/rewards/modal-header-bg.png" w="100%" h="100%" objectFit="cover" position="absolute" />
      <Flex p={6} flexDirection="column" justifyContent="center" alignItems="center" gap={6} position="relative" zIndex={2}>
        <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
          <AppIcons.Soon />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {t('proPlanModal.header.title')}
        </Text>
        <Text fontSize="md" color={"text.subtext.placeholder.light"} textAlign="center">
          {t('proPlanModal.header.description')}
        </Text>
      </Flex>
    </Box>
  );
};
