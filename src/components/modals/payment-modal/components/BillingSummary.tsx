import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import useAppStore from 'stores/app/appStore';
import useSubscriptionPlanStore from 'stores/subscription-plan.ts/subscriptionPlanStore';

interface BillingSummaryProps {
  subscriptionCost: number;
  total: string;
}

function BillingSummary({ subscriptionCost, total }: BillingSummaryProps) {
  const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration);
  const { shop } = useAppStore();
  const canActivateTrial = shop?.subscription?.canActivateTrial ?? false;
  const source = new URLSearchParams(window.location.search).get('source');

  const getBillingCycleText = () => {
    if (preferredPlanDuration.month === 1) return 'Monthly';
    if (preferredPlanDuration.month === 12) return 'Yearly';
    if (preferredPlanDuration.month === 36) return '3-Year';
    return `${preferredPlanDuration.month} Months`;
  };

  return (
    <Box borderRadius="lg" border="1px solid" borderColor="#282828" display="flex" flexDirection="column" alignItems="flex-start" overflow="hidden" width="100%">
      <Box p={6} display="flex" flexDirection="column" gap={4} width="100%">
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="text.subtext.placeholder.dark" fontSize="base">
            Billing Cycle
          </Text>
          <Text color="white" fontSize="base" fontWeight="medium">
            {getBillingCycleText()}
          </Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="text.subtext.placeholder.dark" fontSize="base">
            Subscription cost
          </Text>
          <Flex alignItems="center" gap={1}>
            <Text color="white" fontSize="base" fontWeight="medium">
              {source === 'crossmint' ? '3 month free' : canActivateTrial ? 'First month free' : (
                <>
                  `$${subscriptionCost}`{' '}
                  <Text color="#868686" fontSize="base">
                    USD
                  </Text>
                </>
              )}
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Box width="100%" height="1px" borderTop="1px solid" borderColor="#282828" />

      <Flex p={6} justifyContent="space-between" alignItems="center" width="100%">
        <Text color="text.subtext.placeholder.dark" fontSize="base">
          Total
        </Text>
        <Flex alignItems="center" gap={1}>
          <Text color="white" fontSize="base" fontWeight="medium">
            {total === '0.00' ? 'Free' : `$${total}`}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingSummary;
