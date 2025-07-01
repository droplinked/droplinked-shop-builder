import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/rewards/en.json';
import localAr from 'locales/rewards/ar.json';

export const PlanDetails = ({ unlockedMonths }: { unlockedMonths: number }) => {
  const { t } = useLocaleResources('rewards', { en: localEn, ar: localAr });

  return (
    <VStack px={12} py={2}>
      <Box p={6} w="100%" bg="rgba(43, 206, 161, 0.1)" borderRadius="2xl" border="1px solid #2bcea1" display="flex" flexDirection="column" gap={4}>
        <Flex width={12} height={12} p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
          <AppIcons.ProPlan color="white" />
        </Flex>
        <Flex flexDirection="column" gap={0.5}>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {t('proPlanModal.planDetails.title', { months: unlockedMonths })}
          </Text>
          <Text fontSize="sm" color="#b1b1b1">
            {t('proPlanModal.planDetails.description')}
          </Text>
        </Flex>
      </Box>
      <Image src="/assets/images/rewards/modal-footer-bg.png" w="100%" h="100%" objectFit="cover" position="absolute" />
    </VStack>
  );
};
