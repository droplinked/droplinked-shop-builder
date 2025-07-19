import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DashboardSm } from 'assets/icons/System/Dashboard/DashboardSm';
import { Star2Sm } from 'assets/icons/System/Star2/Star2Sm';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface FeatureListProps {
  trialMonths: number;
}

const FeatureList: React.FC<FeatureListProps> = ({ trialMonths }) => {
  const { t } = useLocaleResources('public-pages/landings/partner-pages');

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="flex-start"
      gap={{ base: '12px', md: 'auto' }}
      alignSelf="stretch"
    >
      <Flex alignItems="center" gap="12px" flex="1 0 0">
        <Box padding="2" bg="button.hover.transparent" rounded="full">
          <Star2Sm color="#2BCFA1" />
        </Box>
        <AppTypography color="#FFF" fontSize="14px" fontWeight="400">
          {t('FeatureList.proPlanLabel', { trialMonths })}
        </AppTypography>
      </Flex>
      <Flex alignItems="center" gap="12px" flex="1 0 0">
        <Box padding="2" bg="button.hover.transparent" rounded="full">
          <DashboardSm color="#2BCFA1" />
        </Box>
        <AppTypography color="#FFF" fontSize="14px" fontWeight="400">
          {t('FeatureList.instantVerificationLabel')}
        </AppTypography>
      </Flex>
    </Flex>
  );
};

export default FeatureList; 