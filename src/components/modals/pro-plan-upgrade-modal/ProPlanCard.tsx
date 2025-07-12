import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Refresh1Md } from 'assets/icons/Action/Refresh1/Refresh1Md';
import { DashboardMd } from 'assets/icons/System/Dashboard/DashboardMd';
import { ShieldMd } from 'assets/icons/System/Shield/ShieldMd';
import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import PlanPrice from 'components/redesign/plan-price/PlanPrice';
import React, { useState } from 'react';
import ProPlanFeatures from './ProPlanFeatures';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ProPlanCardProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  businessPlan: any;
}

const ProPlanCard: React.FC<ProPlanCardProps> = ({ isCrossmint, canActivateTrial, businessPlan }) => {
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const { t } = useLocaleResources('common');

  return (
    <Box
      borderRadius="2xl"
      border="1px solid"
      bg="label.primary"
      borderColor="main.primary"
      backdropFilter="blur(150px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      overflow="hidden"
    >
      <VStack p={6} w="full" gap={4} alignItems="start">
        <IconWrapper bg="label.primary" borderColor="label.primary" icon={<SuitcaseLg />} />

        <VStack w="full" gap={2} alignItems="start">
          <VStack w="full" gap={0.5} alignItems="start">
            <Text fontSize="lg" fontWeight="bold" color="white" lineHeight="7">
              {isCrossmint ? t('proPlan.card.crossmintTitle') : t('proPlan.card.proTitle')}
            </Text>
            <Text fontSize="sm" color="text.subtext.placeholder.light" fontWeight="normal" lineHeight="tight">
              {t('proPlan.card.description')}
            </Text>
          </VStack>

          {businessPlan && !isCrossmint && <PlanPrice plan={businessPlan} showFree={canActivateTrial} />}
        </VStack>

        <Flex w="full" justify="start" alignItems="center" gap={6}>
          <Flex justify="center" alignItems="center" gap={2}>
            <ShieldMd color="#2BCFA1" />
            <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
              {t('proPlan.card.proAccess')}
            </Text>
          </Flex>

          <Flex justify="center" alignItems="center" gap={2}>
            <DashboardMd color="#2BCFA1" />
            <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
              {t('proPlan.card.cancelAnytime')}
            </Text>
          </Flex>

          <Flex justify="center" alignItems="center" gap={2}>
            <Refresh1Md color="#2BCFA1" />
            <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
              {t('proPlan.card.seamlessActivation')}
            </Text>
          </Flex>
        </Flex>
      </VStack>

      <ProPlanFeatures 
          isExpanded={isFeaturesExpanded} 
          isCrossmint={isCrossmint} 
          onToggleExpanded={() => setIsFeaturesExpanded(!isFeaturesExpanded)} 
        />
    </Box>
  );
};

export default ProPlanCard; 