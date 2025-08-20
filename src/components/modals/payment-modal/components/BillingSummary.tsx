import { Box, Flex, Text } from '@chakra-ui/react';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import React from 'react';
import useAppStore from 'stores/app/appStore';
import useSubscriptionPlanStore from 'stores/subscription-plan.ts/subscriptionPlanStore';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import PricingDisplay from './PricingDisplay';

interface BillingSummaryProps {
  subscriptionCost: string;
  total: string;
}

function BillingSummary({ subscriptionCost, total }: BillingSummaryProps) {
  const shopSetupUI = useOnboardingStore(s => s.shopSetupUI);
  const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration);
  const { shop } = useAppStore();
  const canActivateTrial = shop?.subscription?.canActivateTrial ?? false;
  const { t } = useLocaleResources('subscription');

  const getBillingCycleText = () => {
    if (preferredPlanDuration.month === 1) return t('BillingSummary.monthly');
    if (preferredPlanDuration.month === 12) return t('BillingSummary.yearly');
    if (preferredPlanDuration.month === 36) return t('BillingSummary.threeYear');
    return `${preferredPlanDuration.month} Months`;
  };

  const getTotalDisplay = () => {
    if (total === '0.00' || canActivateTrial) {
      return t('BillingSummary.free');
    }
    return `$${total}`;
  };

  return (
    <Box
      borderRadius="lg"
      border="1px solid"
      borderColor="#282828"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      overflow="hidden"
      width="100%"
    >
      <Box p={6} display="flex" flexDirection="column" gap={4} width="100%">
        {/* Billing Cycle Row */}
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="text.subtext.placeholder.dark" fontSize="base">
            {t('BillingSummary.billingCycle')}
          </Text>
          <Text color="white" fontSize="base" fontWeight="medium">
            {getBillingCycleText()}
          </Text>
        </Flex>

        {/* Price Row */}
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="text.subtext.placeholder.dark" fontSize="base">
            {t('common:price')}
          </Text>
          <Flex>
            <Text
              display="flex"
              alignItems="center"
              gap={1}
              color="white"
              fontSize="16px"
              fontWeight="medium"
            >
              <PricingDisplay
                subscriptionCost={subscriptionCost}
                isFromCrossmint={shopSetupUI.isFromCrossmint}
                canActivateTrial={canActivateTrial}
                t={t}
              />
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Divider */}
      <Box width="100%" height="1px" borderTop="1px solid" borderColor="#282828" />

      {/* Total Row */}
      <Flex p={6} justifyContent="space-between" alignItems="center" width="100%">
        <Text color="text.subtext.placeholder.dark" fontSize="base">
          {t('BillingSummary.total')}
        </Text>
        <Flex alignItems="center" gap={1}>
          <Text color="white" fontSize="base" fontWeight="medium">
            {getTotalDisplay()}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingSummary;
